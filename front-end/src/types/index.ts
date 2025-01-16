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
    id?: number
    user_id?: number
    username?: string
    title?: string
    body?: string
    likes? : AddPosteTypes[]
    saves? : AddPosteTypes[]
}

export interface reducersTypes {
    editePost: null | number
    posts: AddPosteTypes[]
    cardsPost: boolean
    actions: null | number
    loading: boolean
}

export interface reducerPosts extends reducersTypes {
    active: boolean,
    following : AccountTypes[]
}
