import { Box, Container, Paper, Typography } from "@mui/material";
import GlobalNavBar from "../../components/GlobalNavBar";
import Footer from "../../components/footer";
import theme from "../../assets/theme";
import { GameCard } from "../../components/GameCard";
import FixedContainer from "../../components/Container";
import { getToken } from "../../services/authentication";

const user = localStorage.getItem("user");

let user_name = "Player"; // Added check to ensure 'user' is not 'null', as throws error

    if (user) {
        try {
            const userObj = JSON.parse(user);
            user_name = userObj.name;
        } catch (error) {
            console.error("Error parsing user data", error);
        }
    }

const gameData = [
    {
        name: "SNAKE",
        img: "https://tilcode.blog/wp-content/uploads/2019/04/Screen-Shot-2019-04-28-at-17.51.16.png",
        description: "AS SEEN ON NOKIA 3210!",
        colour: theme.palette.yellow.main,
        path: "/snakepage"

    },
    {
        name: "CONNECTIONS",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP0AAADICAMAAAAUXBfQAAAAw1BMVEX////v7+fu7uYAAAD09O/w8On39/P6+vjy8ur8/Pr19fD19e34+PD09PS0tLTGxsZaWU/Ozs7Z2dno6ODLy8TV1c7Bwbri4trOzsf9/fW+vr6mpqaYmJPf39+oqKicnJyysqyPj4qSkpLq6uqjo552dnKDg345OTeoqKLDw7xXV1RNTUpiYmJfX1wtLStBQT9sbGwfHx5+fnpHRjkYGBcjIyIwMC49PT2KiooODg1HR0VRUU5PTkNubWV6enUZGRhiYVcWfYzyAAAQhklEQVR4nO2dDX+avBqHgXubcQQY74KgvPuKUp/ZqT3rzvf/VCdB2lWFltKzzWfN/6eIkDvJRUKI3iFwHBMTExMTE9ObJPs/13vVpyK1MIzVk4Dq/zVXv0kTZaGRj375JfLLFS19GqL3ZPlUd/5JwNUvy+Kvk7bjJGlRuLulvyy0eURWyEFYuum8V3DL0VzlhtG34bdRtCu0UTxe7hZ+sZQ4pZhrW42LChJQKrhimGubP43SQWpEFnPublyow1QeS4dxoXGaPOdcOSVQ5KzYKfN4zN1xO1mOh0tu7C6GpNw51S3IsXNpwE0ZMPrTKF20lcbKnCtibee6cuQvJXIqq6M03mlzaTkkJ8Vmo/hj7sDdqWNlvOwVShy5XOpH2pwcO5kGzOPl2OeGf5qki+Kdy7lcL5L7kazFUX8nk22kTrucPFQ00qjl/m6kkWAaN5b95VDhohExi2RiRQL2acARDfivpH9RSvSEa/Tn8sHExMTExMT0bvT5Q6XPpT600qfupuWvu/6paTvLD+Uvx/7j11eYfu7Xw38U+A4SKD7fzZTiC91MCUO/m6VQT98pMp7/0DUfPP+Z/LrvZkqP+aeOppd/KDB6Rt9BjJ7RdxCjZ/SvF6P/RfQiRjzG5IN+0hddkG9YJB+8KJbfH2NrokfUgISkUSFiV6NaerEMf0wWlVkgaaKW9LiyJNnDIs3yueGL9KL31cCHlTOFrYHAQDfmPsDb6X5yUzjbzAkLY2/a28doG+iRtb3ZBzcGwqs1Hnz16vDr6FEKuWCRFFY62AaJwjl8d+6nZxQN9HgdHKbOYpDf8PqPTbC9ye0L/JfoM8hsABssD3gwRBgAIDAH4JkGgJPdzWCiwyNNE31ATGxy8DCAGULWkl4MwV4vLZqCThJOArBXYBTJmXkTPUy3ibMdrMEKoEi2+qq4SPdF+vxrsoAAHB2Mkv7rOgVdBMtJEzCyuXWA7GV6C+6mqKTPvcmhLT1e3zvJvkxBhwR0B4Lb/KY1/Z7SrwbrPM0XRQIhXNa5l+g3yR6mlN4GEwwMgz2tCggsDGvIwrk1t6ANvWUSekzyD/O0Nf0idbwbK7dgr5NM6BisG3ML03b0DqXvbweTAFbhMtknwWWyL9Hfe+nKIJX9fr5ybg735BxwspLeKOvwwjo4d21qfnYfQJ5apBCn+aYlPTHzwAsOzoKYmTd5ChjICdey7O/BWt6EQJoqUkp58sO5bPReokeWYVq2h+0sFJAdZraeiIKnI8+cWaLuBYEZiLb3Yqtnep5nJOTt8VM9sGryUdvqiVYa4DIFkqZOUhcTG08HrVo9IaU53QxwYgfmLBicH7M29DyiEnkkEmOyQDz5pC+y9bhEZPNjbI1XPJGYlm+ehK+Dr7/iIbEMTsxomsfUL8wbyl6sTNADQwf61+lv6+28Toye0XcQo/+X06N3Tf++y57Rdzf9l9ML3ekpwhtMu9LXO/I+CV3Edzf9SE0/dDL98EZTJiamo/qI//hq8eVp1P/YwfTjZ2ra62D48WM5ZuJTJ9P6Jp/r1ILyAmX4/W1+r/vFsr7NZ9f7DmJ9PUbfQYye0b9ejJ7RdzFl9G3odV0UjyNJdcTrvCCgmnGll/QCCU0CUhuyo3zruqDTaE5N6+grE6G0QiI1E6j5GUIdvaALmMc2Lx4zruuY5BhdmLajRyYAeOEt5sUpWA4EcxDD+wvv0AU9sqi7257CDEOAMCSiSCI6HPL+tzN/8iU9suGb48HUOYBoE6swAYwCshKc+rLq6PEeYIEWALNjxgH2IegWnLsAW9NjD7w1OZ7zr6kDVg6Zd+mJvix7EYLZ1llQmwd6C4smeIBPTWvpQThAoBMGHYQpeFtK75wPXamnJ2Y5kINnlxk/cKtsXqzO/aft6SeQUno6ioHSZ5C3ok+LjSfAjNqU9JiUBcb3cJ6RWvo8nNwG0/s01Uny+bSkh7CFBxtvt/sf6cIxYFBmnCwsGxZnR/wV9JbphGvHoVXPAGtubWpGoFzSoxmAXdk4DqnGpA7wGBlwbltLH4C3CnJirUNgOt6WJi+cu2Nr6b+GJg5vSHC7zPitqYvO6sKL3Z7eRmIIq9vJ1FmkECwCBJejEGrafBG2DrFZp/B1632F7T38WC3w7PwMrKcXwKRDVgg7mEj04PYmIe9pi/Oe1DJivwCvzHh2Swdu7S+GrrRt83VDINkxiARkDwa6aSPbvHDE19Aj00RHG8Mwq/cA6ca5aU2bLxiiIQ7MAUID0yDtPU2+fJ8Fq6FHAxII6cEAHzNORzyU27rR85S0HAZQfvCoZhhB/fX+IfBTHaN7iZ6vhh4cU+SrhNuNXkAPaVcZ/7mtE30r/bW9nVZi9Iy+gxg9o3+9GD2j72J6LfTX5M3oFNdf48lq54p8jKX6Wnoxex1My4pPSpBvYcqfmVZezFeZPnz9VAvPxPRO1es0CKgcevSGUUufO5m+YdTS53r67iPW/kyb//8dsfa+r/esr9dBjJ7RdxCjZ/SvF6P/9fSVF+K4uHQqUNX5cqrAlVei2nAZQRM9Oro0GtwnJUID/aPr5Ik/pDM9mlkG0i3dEniLn82s89tha+mRHph4MLMsbAY2QoaJbMtGpiXMaGwt6ImJOLPNgT1DyJzV4jfQ65ZlmSRlk9iJ5Mug5l7U9vQYJjd7CwzYiCDAapLWxHZOj0zIwVrAeh3AHGwBbp0ACucA5kUEDfR47zkQpPMARPHC5/8cPZrBt1sPJhOP3sI9IMnfXVq/ht4awJTQw4DQB3pdTs7pxSnMTGex0Z1iYto4OIBtfSXWYF9E0ES/ykjYTV7Sb19Db4CObBjoWIBJYoIe1hy719ADpAYY682K5n/Vhp5HBQB1wNv2GsDMk5vEylcFvY0ftu3oJ/ADrG70kJJkcmc6zw50/ErNje+voQ8cPANjRQ6DAAaua6Iua37i5PM8dJBlYAhhvT1YeQgzQj87i6Cx7BPuWPYIeVuxLtFGeoxNsEU8X01IisL5cJ9X0yNk0TEoAS372sK/oJ+RgIMFHXJECtubOCZ4dwPggZbFaUk20UNYnfcApB7BhQv+mfNeKMdazQE5xJRP92+p+eVEN6icQIBOtCPW3c5/WfNFu5x2QBSRjUvTciKA47YT06YrHp1yoJw94KiaEA1tfjnA5TjjAU3vcp6e19G3UN31vqXptfd2Wugv7uu1EKN/v/Tv+/77903/vms+o2f0HXRN9H9oFvEulm+YRZxvmEWcazt9+4nKwQD9l8PVqNfdtPTF9bqbMjE9Ub/XQX/StItlU8XvNo6gdId3G0fAU9OP3UxphvlOph/r6X/7FU+4piseG73QQX9Jb4fRdxCjZ/QdxOgZ/ev1i+mpC6V0/ldOnHJOaP7o1Dm9JbiZnnpSyqmgy9mga/STvvLZiI/TT5feGLGaiProCnqYWbqZ/jiRdBnBMXlU4wlqQW+HYSJMLWI/C3ESeqEVhuFMDDxshqJ5cl9zIz0KZ0hMNpYYmnxW44t7Qk+SI2kg0ZuRFcMLPdPysL4jX0IrwUFghkI4wJ4thOHxYQi19HoY6jSmmRcmOhKnU2yE4fT19GgA4eQw34g8PoCZzCFLIMssDKAHgK0TX2TjLOIG3DnZKgEdZggu715+Qo9M2GRTMOh9/llmQHoPA5ilaba6zbJJ/345I5HcOGDezgtopBdXeQ4miWAGxQF0BIATSPbnT09oRT9It3SqAR2WmROAY0BgYGN9O7UI/W0bevE+BZSCZ2N67F6iT2bOOgxyE6aGQ+eb0MMfIDjFdyfcBnffKf3XZBuA7Uz1BnqSZ11PBmUEgQOJlcOMHNH1sgv9ZG7OM4yTSQpH+jxxsnx+NwM8a0WPwYMpDm/Agnn6In3uOckkD0yaDNyBhxF4Ii4KJ9yntwWlnwFMqRu9jKmOfga8KJQxlfRF+i0NYA3neWtFL2C8KAxzscxgUNIbhg2kOC365IwW9KTih4e55/GQ0GdvvERvGaYOQNKlyVjFAmOYinhZOLs1tynpnfz4FJEmel6AhE46MSMReAlZyQqY7gUwzlJuQW9udV5M15O7Ce/kifUNDyaT2/sDxhMrg9sTlAZ60fMcY2LdQopuDWH7Aj2JPXPyFNOVZG0NtjZeBEjMMuyR4s8GE32F9ZU922/TRnrR2u8tGoF39+1gGXNHuM3unO/ns0W0aPMRLV36tJ3ysTsIV8/+oY/jEc8ewdN43ov0oT/lI4bKhw49Q3+M/WhRPmIIlSmVcYjH5xPx5SOEaHTNbT59ttAxAlxFQXJ8ccljvR1Gz+gZ/dvo37f//n3Tv++az+jZ//kd8nFNZd/NGVdG1s0ZV7oAuznjyiEI3Swb/Hhc71MH9d9q2sWymj/hDaZMTExMTExMTEyvlrThuFRSyJpG3rFaH8glC/mkuy1l/3xxy7UeWQuO2+7/+aKc7b1uxRCrIGnK2D1IY9d3lf7Q5SKFk2TVHXJypIy50bCnKmNNleSIU4auWx6F7//58uWf8ljd07US+r90TTvde92Ko3G084d3ajyMlYOfDuVRGo1VLt5om+EwVUdj3y2UYcEVkR+pSqG4Pu3tx/98+fLlPyFZk+jal4ys+eU272TvlSuWi+HGH2o7eSi7G3+XDhXVVw9cPNIiX400d+RGI3eYcmmkjVQljzipNGukTx73en8UrJUkVY3lWB3veht1F/ma6u/G/k4m27nxLnZjTY13pNbLnOzGqq9s5M2oxC/ru0/XssdaXtb3+HTvX6Xx8IHJ++/36sROHtZ64ZdUO9/LxMTExMTExMT0J+STrv2pRqPzDlpfOQ9zoqEsnRnE6qWusMurjuu6ov5Qfvp1OIqfj6Xnjp+G8JU60li5tl7vWGvYIUWPxemP28Qk//wbQ2k6VtJ1/dUxPq+xT7SrPuNhu7hUpVpxn7lf+Jrwayvoo6KTj5d1/M3Lac8cUZJk29h+vZ6v0sdmyn0Wpia65/mePza/U4/nZ0NVHT4u2qn8w/MRryHSqyn8Ckz6lg/nx9WtOtn8PDVH5N2rGv/DfPKzLbutDGnTALE7qr7HlKxq1+MoomsPFwvfH1W2V9PuVxlSbzVuWRQjdTO82X0bK+myag5kUnxadVE4cEoqF6Nx4e6W2kJaFv35XbT1OXkzVuR1FSE9UhWdSi6BETd0h2M/iuRIUzZVoV8N/cM1XU3zJXcYqmk8l3ZydNhV7QFtvLWq8A49LZ2M59FSWUVRHm2Kjcz5G46bb7ZqHT2nDeWIG8vSSFHdeKyqD23M1dBXNV9djJZzbiJvbuJDnI5GB7kqJgrjV7ldk4JeuuPxaHlw3YO7idR8p04k6Y6bR6MV99OgCk86h27kjmV3pypyHBH6qhJdGz0ljDmfU+N+zMWSJD1ksDwzqgoSa6RJU3qSwvVoaM0npzJp4SSJk2IpfoznJ13s0z3k1ZOkPl1Uga6G3n8hJyV9q47ek/DxC53iq6F/oSNz/OmiNvWFL3WsS89f0tTrmTjGl5/ZGVc7W/f1qoDxc4fr2Z2/W8/86pIeqXeNYU70+CtPa+4/S1fT1ymlNnXl3Cc7ohYFJkU/z3e/iVG7npP+qP5wpPrSqWJVPvm5TroushZLzdLc0/8D+orqx2fz5Ui+qlxNH/+JYlU5Vc2/MD1NeUY1P10kXzuV/8K1gImJiYmJqVb/A+KhBbBNxYD1AAAAAElFTkSuQmCC",
        description: "A TOTALLY ORIGINAL GAME!",
        colour: theme.palette.green.main,
        path: "/connections"

    },
    {
        name: "CONNECT 4",
        img: "https://www.charlieintel.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.charlieintel.com/wp-content/uploads/2023/05/29/diablo-4-hardcore-mode-server-discconnect-1024x576.jpg",
        description: "No friends? You are not AUTHORIZED to play this game!",
        colour: theme.palette.red.main,
        path: "/connect4"

    },
    {
        name: "DVD Quest",
        img: "data:image/png;base64,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",
        description: "An ambitious open world game '10/10 - IGM'",
        colour: theme.palette.text.primary,
        path: "/dvdgame"

    },
]

export const GamePage = () => {
    return (
        <>
            <GlobalNavBar />
            <Typography variant="h4" 
                    sx={{ 
                        color: "black",
                        fontFamily: `${theme.typography.retro.fontFamily}`,
                        marginBottom: 4, 
                        textAlign: 'center', 
                    }}
                >
                    Choose a game, {user_name}!
                </Typography>
            <FixedContainer 
                maxWidth={false} 
                disableGutters 
                sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    width: '100%',
                    maxHeight: '2vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column', 
                }}
            >
                <Box 
                    sx={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center", 
                        gap: 4,
                        width: '100%', // Adjust this value to occupy more or less width
                        padding: 1,
                         // Optional: add padding for better spacing
                    }}
                >
                    {gameData.map(game => (
    <GameCard 
        key={game.name} 
        name={game.name} 
        image={game.img} 
        description={game.description} 
        colour={game.colour} 
        path={game.path}
        
    />
))}

                </Box>
            </FixedContainer>
            <Footer />
        </>
    );
};
