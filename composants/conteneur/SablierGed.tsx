import { Spin } from 'antd';
import styled from 'styled-components';

const Composant = styled(Spin)`
    padding: 10px;
    cursor: pointer;

    .wrap_spinner {
        position: relative;
        margin-top: 200px;
        background-color: white;
        border: 2px solid #ddd;
        border-radius: 8px;
        width: 380px;
        height: 150px;
    }

    .svg_spinner {
        position: absolute;
        top: 35px;
        left: 50px;
        width: 266px;
        height: 70px;
        & .fadeleft {
            animation: anim_fadeleft 3s ease-in-out infinite;
        }
        & .faderight {
            animation: anim_faderight 3s ease-in-out infinite;
        }
        & .fadebottom {
            animation: anim_fadebottom 3s ease-in-out infinite;
        }
        & .fadetop {
            animation: anim_fadetop 3s ease-in-out infinite;
        }
        & .blinkpoint {
            animation: anim_blinkpoint 3s ease-in-out infinite;
        }
    }
    .wafa_spinner {
        font-family: 'ROBOTO';
        font-size: 20px;
        font-weight: normal;
        fill: #777;
        letter-spacing: 8.4px;
    }
`;

const SablierGed = ({ enAttente, children }) => {
    const spinner = (
        <div>
            <div className="wrap_spinner">
                <svg className="svg_spinner" viewBox="0 0 380 100">
                    <path d="M90,40 v45 q0,5 -5,5 h-70 q-5,0 -5,-5 v-45 L50,70 z" fill="#62b01e" className="fadebottom" />
                    <path d="M10,40 v-25 q0,-5 5,-5 h70 q5,0 5,5 v25   L50,70   z" fill="orange" className="fadetop" />
                    <path d="M10,40 h10 L50,61 L50,70 L10,40 z" fill="#333" className="fadeleft" />
                    <path d="M90,40 h-10 L50,61 L50,70 L90,40 z" fill="#333" className="faderight" />
                    <rect x="45" y="30" width="10" height="10" fill="#333" className="blinkpoint" />
                    <text x="110" y="57" fontFamily="ROBOTO" fontSize="54" fontWeight="bold" fill="#62b01e">
                        SIN
                    </text>
                    <text x="198" y="57" fontFamily="ROBOTO" fontSize="54" fontWeight="normal" fill="orange">
                        CORPO
                    </text>
                    <text x="114" y="82" className="wafa_spinner">
                        wafa assurance
                    </text>
                </svg>
            </div>
        </div>
    );
    return (
        <Composant spinning={enAttente} indicator={spinner}>
            {children}
        </Composant>
    );
};

export default SablierGed;
