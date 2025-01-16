import { AccountTypes, AddPosteTypes } from "@/types";

export const verfication = (likes: AddPosteTypes[], saves: AddPosteTypes[], userInfo: AccountTypes, id: number | null, following: AccountTypes[]): string | undefined => {
    if (!userInfo) {
        return
    }
    if (likes && likes?.length > 0) {
        const finduser = likes?.find((item: AddPosteTypes) => item?.user_id === userInfo?.id);
        if (finduser) {
            return 'text-red-500';
        } else {
            return 'text-black';
        }
    }

    if (saves && saves?.length > 0) {
        const finduser = saves?.find((item: AddPosteTypes) => item?.user_id === userInfo?.id);
        if (finduser) {
            return 'text-green-500';
        } else {
            return 'text-black';
        }
    }
    if (id) {
        const finduser = following?.find((item: AccountTypes) => item?.id === id);
        if (finduser) {
            return 'bg-blue-500 text-white';
        } else {
            return 'bg-transparent';
        }
    }
}
