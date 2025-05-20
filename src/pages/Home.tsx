import React from 'react'
import { PluralitySocialConnect } from '@plurality-network/smart-profile-wallet'
import { AllAccountsDataType, ConnectedAccountDataType, SignMessageDataType, VerifySignedMessageDataType } from '../plurality-modal'

const Home = () => {
    const options = { clientId: '', theme: 'light', headless: false};

    const getAllAccountsData = async () => {
        const response = (await PluralitySocialConnect.getAllAccounts()) as AllAccountsDataType;
        if (response) {
            const allAccounts = response.data;
            alert(`All Accounts: ${allAccounts[0]}`)
            return allAccounts[0]?.address;
        }
    }

    const getConnectedAccountData = async () => {
        const response = (await PluralitySocialConnect.getConnectedAccount()) as ConnectedAccountDataType;
        if (response) {
            const connectedAccount = response.data;
            alert(`Connected Account: ${connectedAccount}`)
            return connectedAccount?.address;
        }
    }

    const getMessageSignatureData = async (message: string) => {
        const response = (await PluralitySocialConnect.getMessageSignature(message)) as SignMessageDataType;
        if (response) {
            const signMessage = response.data;
            alert(`Sign Message Data: ${signMessage}`)
            return signMessage;
        }
    }

    const getVerifyMessageData = async (message: string, key: string) => {
        const response = (await PluralitySocialConnect.verifyMessageSignature(message, key)) as VerifySignedMessageDataType;
        if (response) {
            const verifyMessage = response.data;
            alert(`Verification Signature Data: ${verifyMessage}`)
            return verifyMessage;
        }
    }

    const loadPublicData = async () => {
        const response = (await PluralitySocialConnect.getPublicData("name")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("Load Public Data  (Inisde dApp):", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const storePublicData = async () => {
        const response = (await PluralitySocialConnect.setPublicData("name", "plural-abc")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const loadPrivateData = async () => {
        const response = (await PluralitySocialConnect.getPrivateData("work")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const storePrivateData = async () => {
        const response = (await PluralitySocialConnect.setPrivateData("work", "Plurality")) as ConnectedAccountDataType;
        if (response) {
            // const connectedAccount = response.data;
            console.log("response", response.data)
            // alert(`Connected Account: ${response.data}`)
            // return connectedAccount?.address;
        }
    }

    const updateConsent = async () => {
        const response = (await PluralitySocialConnect.updateConsentOption()) as ConnectedAccountDataType;
        if (response) {
            const smartProfileData = response.data;
            alert(`Connected Account: ${JSON.stringify(response.data)}`)
            return smartProfileData;
        }
    }

    const fetchSmartProfileData = async () => {
        const response = (await PluralitySocialConnect.getSmartProfileData()) as ConnectedAccountDataType;
        if (response) {
            const smartProfileData = response.data;
            alert(`Connected Account: ${JSON.stringify(response.data)}`)
            return smartProfileData;
        }
    }

    const fetchLoginInfo = async () => {
        const response = (await PluralitySocialConnect.getLoginInfo()) as ConnectedAccountDataType;
        if (response) {
            const loginInfoData = response.data;
            console.log("Connected Account Info (Inisde dApp)::", loginInfoData);
            alert(`Connected Account: ${JSON.stringify(loginInfoData)}`)
            return loginInfoData;
        }
    }

    const handleDataReturned = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Login info callback data (Inisde dApp)::", receivedData);
    };

    const handleProfileLogout = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("Logout message", receivedData);
    };



    return (

        <div style={{
            padding: "10px"
        }}>
            <PluralitySocialConnect
                options={options}
                onDataReturned={handleDataReturned}
                onProfileLogout={handleProfileLogout}
            />
            <div style={{
                width: '180px',
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "30px"
            }}>
                <button onClick={() => PluralitySocialConnect.connectProfile()}>Connect Profile</button>

                <button onClick={() => getAllAccountsData()}>Get All Accounts</button>
                <button onClick={() => getConnectedAccountData()}>Get Connected Account</button>
                <button onClick={() => getMessageSignatureData("Example `personal_sign` message.")}>Sign Message</button>
                <button onClick={() => getVerifyMessageData("Example `personal_sign` message.", "0x4b0a58d64ef2a4a5b6f60cf0b5f7decfec842e1bca35fba261660770d997297a66dad78ba2b2bd273f7de8130178bc93ddd44be3bafe1a94a8fd81a16a89cb0e1c")}>Verify Message</button>
                <button onClick={() => loadPublicData()}>Get Public Data</button>
                <button onClick={() => storePublicData()}>Set Public Data</button>
                <button onClick={() => loadPrivateData()}>Get Private Data</button>
                <button onClick={() => storePrivateData()}>Set Private Data</button>
                <button onClick={() => fetchLoginInfo()}>Get Login Info</button>
                <button onClick={() => updateConsent()}>Update Consent</button>
                <button onClick={() => fetchSmartProfileData()}>Get Smart Profile Data</button>

                <button onClick={() => PluralitySocialConnect.navigateTo('profile')}>Profile</button>
                <button onClick={() => PluralitySocialConnect.navigateTo('wallet')}>Wallet</button>
                <button onClick={() => PluralitySocialConnect.navigateTo('socialConnect')}>Connected Platforms</button>
                <button onClick={() => PluralitySocialConnect.navigateTo('profileSettings')}>Update Profile</button>
                <button onClick={() => PluralitySocialConnect.disconnectProfile()}>Logout</button>
            </div>
        </div>
    )
}

export default Home
