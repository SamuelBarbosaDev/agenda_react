import styled from "styled-components";
import * as color from '../../config/colors'


export const Main = styled.main`

    .main-content > h1{
        margin-bottom: 4rem;
    }
`

export const ListaAlunos = styled.ul`
    li{
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    li + li{
        border-top: 0.1rem solid ${color.color_2};
    }

    li:hover{
        background-color: ${color.color_6}
    }

    .student-content{
        display: flex;
        margin-right: 2rem;
        align-items: center;
        justify-content: center;
    }

    .student-content > div{
        margin: 0 1rem 0 1rem;
    }

    .student-buttons{
        display: flex;
        justify-content: space-between;
        font-size: 2rem;
    }

    .student-button-edit,
    .student-button-delete{
        cursor: pointer;
        margin-left: 1rem;
    }

    .student-button-edit{
        color: ${color.color_2};
    }

    .student-button-delete{
        color: ${color.color_5};
    }

    .profile-picture > img{
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 2rem;
    }
`
