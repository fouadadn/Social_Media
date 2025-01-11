export interface AccountTypes {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    password_confirmation?: string,
    posts?: AddPosteTypes[],
    followers?: AccountTypes[],
    following?: AccountTypes[]
}
export interface AddPosteTypes {
    id?: number,
    user_id?: number,
    title?: string,
    body?: string,
    likes? : AddPosteTypes[]
}
export interface reducerPosts {
    cardsPost: boolean,
    posts: AddPosteTypes[],
    isPostReady: boolean,
    loading: boolean,
    editePost: null,
    actions: null,
    active: boolean
}

export interface reducerDashoard {
    loading: boolean,
    cardsPost: boolean,
    actions: null,
    posts: AddPosteTypes[],
    editePost: null,
}