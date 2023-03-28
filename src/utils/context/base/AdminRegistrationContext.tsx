import { createContext, useState, useCallback } from 'react'
import { ContextSetup } from '..'
import { buildHttp } from '@/pages/api/http'
import { useApiCallBack } from '@/utils/hooks/useApi'
import { useAccessToken, useRefreshToken } from "../hooks/hooks";
export const ARContext = createContext<ContextSetup | null>(null)

type ARContextProps = {
    children: React.ReactNode
}

export type AuthenticationProps = {
    userId : any
    savedAuth : any
}



const AdminRegistrationContext: React.FC<ARContextProps> = ({
    children
}) => {
    const [accessToken, setAccessToken] = useAccessToken()
    const [refreshToken, setRefreshToken] = useRefreshToken()
    const fetchAllUsersExecutioner = useApiCallBack(api => api.users.fetchAllUsersFunc())
    const [isHidden, setIsHidden] = useState(false)
    const [users, setUsers] = useState([])
    const FetchAuthentication = useApiCallBack(async (api, args: AuthenticationProps) => {
        const result = await api.authentication.userAvailabilityCheck(args)
        return result
    })
    
    const callBackSyncGetAllUsers = useCallback(() => {
        fetchAllUsersExecutioner.execute()
        .then((response: any) => {
            const { data } : any = response;
            setUsers(data)
        })
    }, [])
    const CheckAuthentication = () => {
       return new Promise((resolve, reject) => {
        let savedAuthStorage;
        const savedTokenStorage = localStorage.getItem('token')
        if(typeof savedTokenStorage == 'string'){
            savedAuthStorage = JSON.parse(savedTokenStorage)
        }
        const uuid = localStorage.getItem('uid') === null ? 0 : localStorage.getItem('uid')
        if(savedAuthStorage == undefined && uuid == 0) {
          return;
        } else {
            /* if the token is not valid or neither expired -> fetching API to get the user data breakdown will prohibited.  */
            const result = FetchAuthentication.execute({
              userId : uuid == null ? 0 : uuid,
              savedAuth: savedAuthStorage == null ? null : savedAuthStorage
            })
            return resolve(result)
        }
       })
    }
    return (
        <ARContext.Provider
        value={{
            isHidden, setIsHidden,
            CheckAuthentication,
            users, setUsers,
            callBackSyncGetAllUsers
        }}
        >
            {children}
        </ARContext.Provider>
    )
}

export default AdminRegistrationContext