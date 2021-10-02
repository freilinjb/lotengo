import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { Carousel } from '@trendyol-js/react-carousel'
import {
    Button,
    Icon,
    Grid,
    FormGroup,
    Card,
    CardActions,
    Typography,
    Box,
    CardHeader,
    Avatar,
    CardContent,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core'

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

export default function LoteriaCheckBox() {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    })

    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked })
    }

    return (
        <>
            <Carousel show={4} slide={3} swiping={true}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Loteka"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Loteka"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ width: 56, heigth: 56 }}
                                aria-label="recipe"
                                alt="Logo loteria"
                                src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                            />
                        }
                        title="Lotería Real"
                    ></CardHeader>
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Juega + Pega +"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Gana Más"
                            />
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Lotería Nacional"
                            />
                        </FormGroup>
                    </CardContent>
                </Card>
            </Carousel>
        </>
    )
}
