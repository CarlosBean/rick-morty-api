export interface PageInfo {
  count: number;
  pages: number;
  next?: string;
  prev?: null;
}

export interface PageResponse {
  info: PageInfo;
  results: any[];
}
