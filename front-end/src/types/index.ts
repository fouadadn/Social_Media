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