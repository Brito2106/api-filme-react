
import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;
    color: #ffffff;

    h1 {
        text-align: center;
        margin: 2rem 0 3rem;
    }

    h2 {
        margin: 2rem 0 1.5rem;
        text-align: center;
    }
`;

export const GenreList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.7rem;
    margin-bottom: 3rem;
`;

export const GenreButton = styled.button`
    padding: 0.7rem 1.2rem;
    border: 1px solid #ffffff;
    border-radius: 20px;
    color: #ffffff;
    background-color: ${(props) =>
        props.$active ? "#e50914" : "#252525"};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e50914;
        transform: translateY(-2px);
    }
`;

export const MovieList = styled.ul`
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(180px, 1fr)
    );
    column-gap: 2rem;
    row-gap: 3rem;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    text-align: center;

    img {
        width: 180px;
        max-width: 100%;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
    }

    span {
        font-weight: bold;
        font-size: 120%;
        text-align: center;
    }

    a {
        text-decoration: none;
        transition: all 0.3s;
    }

    a:hover {
        transform: scale(1.05);
    }
`;

export const Btn = styled.button`
    margin-top: 5px;
    padding: 0.7rem 3rem;
    border: none;
    border-radius: 15px;
    color: #212121;
    background-color: #ffffff;
    font-weight: 1000;
    font-size: 12px;
    cursor: pointer;
    transition: all 250ms;

    &:hover {
        background-color: #e50914;
        color: #ffffff;
    }
`;
