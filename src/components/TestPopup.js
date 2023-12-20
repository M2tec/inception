import { Link, useNavigate } from 'react-router-dom';

export default function TestPopup(props) {

    function popitup(sessionID) {
        localStorage.setItem('sessionID', sessionID);

        let url = window.location.origin + "/connect"
        console.log(url)

        let newwindow=window.open(url, "Gamechanger connect id: " + sessionID,'height=400,width=300');
        if (window.focus) {newwindow.focus()}
           return false;     
    }
    

    function popitupReturn(sessionID) {
        localStorage.setItem('sessionID', sessionID);

        let returnData = "1-H4sIAAAAAAAAA11QTU8rMQz8Lzn3kDhfm94Q7_CQEFxAQkJPyGtnW2iz201SaLfqf3_bInHAt5mxx_acRDzshlyLWJ7E_UCbtz8xDRewncHz08ujWMrFFYjl60nshu07He9YLAUyioXAUmJ9wBR_mHGPfX2vx5mw8lri_G8hSsJcb4e-ZqR60Zy1Ul1kALBaa-u1cS4qYnaNVKpFllIrExrbKPHL4C-W9WxCMHdYhQ4btLbF2EHUrCW4IOcxNEDWxpZbz8rIiByVR6vlb7sb5hxLuf7A-a3GUtWUd-MhrBxDCPVrLQP5fuxsKZtwDBr8epNwKg0kqg4-A49fH7DX_JFxJVPsI1AKcbu3icdEU5gI8rQaPdmVG-2BepPFd7BPh3lvG6h10rCi-UqF3RwCBSM1YTRKgTatCrEjT-QbUiSdxM4Fb1zHAJpAnM_n_6NIvcTNAQAA"

        let url = window.location.origin + "/connect/" + returnData
        console.log(url)

        let newwindow=window.open(url, "Gamechanger connect id: " + sessionID,'height=400,width=300');
        if (window.focus) {newwindow.focus()}
           return false;     
    }

    return (
        <>
            <div>
                {/* <a target='_' onClick={() => { toComponentB() }}>Click me!</a> */}
                <a target='_' onClick={() => { popitup(1) }}>POP!</a>

                <a target='_' onClick={() => { popitupReturn(2) }}>Return POP!</a>
            </div>
        </>
    );
}




