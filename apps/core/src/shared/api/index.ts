import { instance } from 'shared/api/instance';
import { UserApi } from 'shared/api/services/user-api';

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>;
};

export const Api = () => {
    return {
        user: UserApi(instance)
    };
};
