export interface AccountTypes {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    password_confirmation?: string
    posts?: AddPosteTypes[]
    followers?: AccountTypes[]
    following?: AccountTypes[]
    profile? : null | File
    backGround? : null | File
}
export type ApiResponse = {
    data?: AccountTypes[]
}
export interface AddPosteTypes {
    id?: number
    user_id?: number
    username?: string
    title?: string
    body?: string
    image?: null | File
    likes?: AddPosteTypes[]
    saves?: AddPosteTypes[]
    comments?: CommentsTypes[]
}

export interface SavedPostsTypes extends AddPosteTypes {
    data?: AddPosteTypes[]
}

export interface CommentsTypes {
    id: number
    user_id: number
    post_id: number
    body: string
    username: string
    likes: AddPosteTypes[]
    replies: CommentsTypes[]
}

export interface reducersTypes {
    editePost: null | number
    posts: AddPosteTypes[]
    cardsPost: boolean
    actions: null | number
    loading: boolean
}

export interface reducerPosts extends reducersTypes {
    active: boolean
    following: AccountTypes[]
    usersLiked: AccountTypes[]
    showComments: null | number
    actionsComments: null | number
    showReplay: null | number
    commentPost : string
    replyComment : string
    message : string
}
