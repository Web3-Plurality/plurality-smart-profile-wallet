import React from 'react'
import { PluralitySocialConnect } from '../plurality-modal'
import { PrivateAppData } from '../plurality-modal/types/returnTypes';

const SecondPage = () => {
    const options = { clientId: '', theme: 'light', text: 'Customizable Button' };

    const fetchAppData = async () => {
        const response = (await PluralitySocialConnect.getAppData('test')) as PrivateAppData;
        console.log("res", response)
        if (response) {
            const appData = response.data;
            alert(`Extended Private Data: ${JSON.stringify(appData)}`)
            return appData;
        }
    }

    const writeAppData = async () => {
        const response = (await PluralitySocialConnect.setAppData("test", 'ExtentedPrivateData'));
        console.log("res", response)
        if (response) {
            console.log("writeAppData Response", response)
        }
    }

    return (
        <div style={{
            padding: "10px"
        }}>
            <PluralitySocialConnect
                options={options}
                customization={{
                    backgroundColor: 'cyan',
                    color: "black",
                }} />
            <div style={{
                width: '180px',
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "30px"
            }}>
                <button onClick={() => fetchAppData()}>Get App Data</button>
                <button onClick={() => writeAppData()}>Set App Data</button>
            </div>
        </div>
    )
}

export default SecondPage
