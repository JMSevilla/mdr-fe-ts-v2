import { AxiosInstance } from "axios";
import { AuthenticationProps } from '@/utils/context/base/AdminRegistrationContext'
import { LoginProps, CreateTokenArgs, CreateAuthHistoryArgs, AuthenticationJwtCreateAccount, AuthenticationRefreshTokenArgs } from './types'
export class AuthenticationApi {
    constructor(private readonly axios: AxiosInstance) {}
    public userAvailabilityCheck(props : AuthenticationProps){
        return this.axios.post<AuthenticationProps>('/api/authhistory/fetch-saved-auth-history', props)
    }
    public userAuthLogin(props : LoginProps){
        return this.axios.post<LoginProps>('/api/users/login', props)
    }
    public createToken(props: CreateTokenArgs){
        return this.axios.post<CreateTokenArgs>('/api/token/create-token', props)
    }
    public createAuthenticationHistory(props: CreateAuthHistoryArgs) {
        return this.axios.post<CreateAuthHistoryArgs>('/api/authhistory/create-auth-history', props)
    }
    public fetchCreatedAuthHistory(userId : number | any) {
        return this.axios.get(`/api/authhistory/fetch-created-auth-history/${userId}`)
    }
    public authenticationJwtLogin(jwtusername: string | any, jwtpassword: string | any){
        return this.axios.post(`/api/authentication/auth-secure-login/${jwtusername}/${jwtpassword}`)
    }
    public authenticationJwtCreateAccount(props: AuthenticationJwtCreateAccount) {
        return this.axios.post(`/api/authentication/auth-secure-register`, props)
    }
    public authenticationJwtRefreshToken(props: AuthenticationRefreshTokenArgs){
        return this.axios.post('/api/authentication/auth-secure-refresh-token', props)
    }
    public authenticationJwtMockGetter(){
        return this.axios.get('/api/authentication/auth-jwt-mock-getter')
    }
    public authenticationGoogleLogin(email: string | undefined) {
        return this.axios.post(`/api/customer/customer-google-login/${email}`)
    }
}