import { Movie } from './movie';

export interface UserListResponse {
    page: number,
    results: UserList[]
    total_pages: number
    total_results: number
}

export interface UserList {
    description: string,
    favorite_count: number,
    id: number,
    iso_639_1: string,
    item_count: number,
    list_type: string,
    name: string,
    poster_path: string
}

export interface ListDetail {
    created_by: string,
    description: string,
    favorite_count: number,
    id: string,
    iso_639_1: string,
    item_count: number,
    items: Movie[],
    name: string,
    poster_path: string
}