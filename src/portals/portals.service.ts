import {
  Injectable,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import * as https from 'https';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface Portal {
  Title: string;
  Link: string;
  isFavorite?: boolean;
}

@Injectable()
export class PortalsService implements OnModuleInit {
  private readonly DATA_URL =
    'https://raw.githubusercontent.com/CSwala/awesome-career-pages/main/Portal.json';
  private readonly DATA_DIR = path.join(process.cwd(), 'src/data');
  private readonly DATA_PATH = path.join(
    process.cwd(),
    'src/data/portals.json',
  );
  private readonly FAVORITES_PATH = path.join(
    process.cwd(),
    'src/data/favorites.json',
  );

  private portals: Portal[] = [];
  private favorites: string[] = [];

  async onModuleInit() {
    await this.ensureDataDir();
    await this.loadLocalData();
    // Sync with remote on startup but don't block
    void this.syncWithRemote().catch((err: Error) => {
      console.error('Initial sync failed:', err.message);
    });
  }

  private async ensureDataDir() {
    try {
      await fs.mkdir(this.DATA_DIR, { recursive: true });
    } catch {
      // Ignore if exists
    }
  }

  private async loadLocalData() {
    try {
      const data = await fs.readFile(this.DATA_PATH, 'utf-8');
      this.portals = JSON.parse(data) as Portal[];
      console.log(`Loaded ${this.portals.length} portals from local cache.`);
    } catch {
      console.log('No local cache found.');
      this.portals = [];
    }

    try {
      const favs = await fs.readFile(this.FAVORITES_PATH, 'utf-8');
      this.favorites = JSON.parse(favs) as string[];
    } catch {
      this.favorites = [];
      await fs.writeFile(this.FAVORITES_PATH, '[]');
    }
  }

  async syncWithRemote(): Promise<{ success: boolean; count: number }> {
    console.log('Syncing with remote data...');
    return new Promise((resolve, reject) => {
      const request = https.get(this.DATA_URL, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch: ${res.statusCode ?? 'unknown'}`));
          return;
        }

        let data = '';
        res.on('data', (chunk: string) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data) as Portal[];
            this.portals = parsed;
            void fs
              .writeFile(this.DATA_PATH, JSON.stringify(this.portals, null, 2))
              .then(() => {
                console.log(
                  `Successfully synced ${this.portals.length} items.`,
                );
                resolve({ success: true, count: this.portals.length });
              })
              .catch((err: Error) => {
                reject(
                  new InternalServerErrorException(
                    'Failed to write local cache: ' + err.message,
                  ),
                );
              });
          } catch (e: unknown) {
            const err = e as Error;
            reject(
              new InternalServerErrorException(
                'Failed to parse remote JSON: ' + err.message,
              ),
            );
          }
        });
      });

      request.on('error', (err: Error) => {
        reject(
          new InternalServerErrorException(
            'Network error while syncing: ' + err.message,
          ),
        );
      });

      // Handle timeout for huge data
      request.setTimeout(60000, () => {
        request.destroy();
        reject(new Error('Sync timeout after 60 seconds'));
      });
    });
  }

  getPortals(query: { search?: string; page?: number; limit?: number }) {
    let filtered = [...this.portals];

    if (query.search) {
      const s = query.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.Title && p.Title.toLowerCase().includes(s)) ||
          (p.Link && p.Link.toLowerCase().includes(s)),
      );
    }

    // Add favorite status
    const resultData = filtered.map((p) => ({
      ...p,
      isFavorite: this.favorites.includes(p.Title),
    }));

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: resultData.slice(start, end),
      total: resultData.length,
      page,
      limit,
      totalPages: Math.ceil(resultData.length / limit),
    };
  }

  getSuggestions(q: string): string[] {
    if (!q) return [];
    const s = q.toLowerCase();
    return this.portals
      .filter((p) => p.Title && p.Title.toLowerCase().includes(s))
      .map((p) => p.Title)
      .slice(0, 10);
  }

  async toggleFavorite(title: string, isFavorite: boolean) {
    if (isFavorite) {
      if (!this.favorites.includes(title)) {
        this.favorites.push(title);
      }
    } else {
      this.favorites = this.favorites.filter((favTitle) => favTitle !== title);
    }
    await fs.writeFile(
      this.FAVORITES_PATH,
      JSON.stringify(this.favorites, null, 2),
    );
    return { success: true, isFavorite, title };
  }
}
