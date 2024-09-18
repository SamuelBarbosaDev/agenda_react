import styled from 'styled-components';
import {color_black, color_white} from '../../config/colors'


export const HeaderContent = styled.header`
background-color: ${color_black};

.header-content{
    width: 90%;
    height: 5rem;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
}

nav a{
    color: ${color_white};
}
`
