import imageRoberval from  '../assets/welcom_to_roberval.svg'
import './Login.scss'


export function Login() {
    return (
    <>
    <div className="container">
        <div className="container_img">
            <img src={imageRoberval} alt="svg" id="img_roberval"/>
        </div>
            {/*<div className="container_form">*/}
            {/*    /!*<h1 id="h1_roberval" style={{textTransform: 'uppercase', color: 'white'}}> Roberval</h1>*!/*/}
            {/*    /!*<h3>institution mixte roberval</h3>*!/*/}
            {/*</div>*/}
    </div>
        </>
    )
}