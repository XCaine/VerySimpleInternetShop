export interface ApiList<T> {
    count: number,
    next: string,
    previous: string,
    results: T[]
}