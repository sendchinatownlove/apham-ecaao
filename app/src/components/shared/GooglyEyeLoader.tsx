import styled from "styled-components";

const GooglyEyeLoaderImg = styled.img`
    content: url("/googly-eye-loading.gif");
    // position: relative;
    top: -40vh;
    margin: auto;
`;

function GooglyEyeLoader() {
    return <GooglyEyeLoaderImg></GooglyEyeLoaderImg>;
}

export default GooglyEyeLoader;
