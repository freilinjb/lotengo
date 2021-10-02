import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

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
            <Grid container spacing={6}>
                <Grid item lg={3} sm={6} xs={6}>
                    <Card sx={{ maxWidth: 345 }} className="elevation-z9">
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ width: 56, heigth: 56 }}
                                    aria-label="recipe"
                                    alt="Logo loteria"
                                    src="https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/07/16144531/Loteria-Nacional-Dominicana.jpg"
                                />
                            }
                            title="Loteria Nacional"
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
                </Grid>
                <Grid item lg={3} sm={6} xs={6}>
                    <Card sx={{ maxWidth: 500 }}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ width: 100, heigth: 100 }}
                                    aria-label="recipe"
                                    alt="Logo loteria"
                                    src="https://seeklogo.com/images/L/leidsa-logo-75F461A35C-seeklogo.com.png"
                                />
                            }
                            title="Leidsa"
                        ></CardHeader>
                        <CardContent>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox  />}
                                    label="Juega + Pega +"
                                />
                                <FormControlLabel
                                    control={<Checkbox  />}
                                    label="Gana Más"
                                />
                                <FormControlLabel
                                    control={<Checkbox  />}
                                    label="Lotería Nacional"
                                />
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} sm={6} xs={6}>
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
                </Grid>
                <Grid item lg={3} sm={6} xs={6}>
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
                                    control={<Checkbox  />}
                                    label="Juega + Pega +"
                                />
                                <FormControlLabel
                                    control={<Checkbox  />}
                                    label="Gana Más"
                                />
                                <FormControlLabel
                                    control={<Checkbox  />}
                                    label="Lotería Nacional"
                                />
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
