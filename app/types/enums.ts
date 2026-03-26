export enum NewsSource {
  MOS_RU = 'mosru',
  LENTA_RU = 'lentaru',
  ALL = 'all'
}

export enum VisualMode {
  ROWS = 'rows',
  GRID = 'grid'
}

export function getNewsSourceByKey(value: string): NewsSource | undefined {
  const keys = Object.keys(NewsSource) as (keyof typeof NewsSource)[];
  const key = keys.find(k => NewsSource[k] == value);
  return key ? NewsSource[key] : undefined;
}