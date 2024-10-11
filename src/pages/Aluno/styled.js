import styled from "styled-components";
import * as color from '../../config/colors';


export const Title = styled.h1`
  margin-bottom: 2rem;
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    div{
        display: flex;
        flex-direction: column;
        margin: 0 0 2rem 0
    }

    input{
        height: 4rem;
        padding: 0 2rem;
    }

    input:focus{
        border: solid 0.1rem ${color.color_2};
    }

    button{
       width: 10rem;
       height: 5rem;
       background-color: ${color.color_2};
       color: ${color.color_white};
       font-weight: bolder;
       border-radius: 1rem;
       border: 0.2rem solid ${color.color_2};
    }

    button:hover{
       color: ${color.color_2};
       background-color: ${color.color_white};
       border-color: ${color.color_2};
    }
`;
