import React from 'react';
import TerminalFormulario from 'app/components/formulario/TerminalFormulario';
import StepperForm from '../material-kit/forms/StepperForm';
import { Breadcrumb, SimpleCard } from 'app/components';

const AppForm = () => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Terminal', path: '/terminal/admin' },
                        { name: 'Registro' },
                    ]}
                />
            </div>
            <SimpleCard title="Registro de Terminal de Venta">
                <TerminalFormulario />
            </SimpleCard>
            <div className="py-3" />
            <SimpleCard title="stepper form">
                <StepperForm />
            </SimpleCard>
        </div>
    )
}

export default AppForm
