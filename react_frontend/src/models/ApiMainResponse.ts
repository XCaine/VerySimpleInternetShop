export interface ApiMainResponse<T> {
    config: any,
    data: T,
    headers: any,
    request: XMLHttpRequest,
    status: number,
    statusText: string,
}