// Hooks
import React, { useState, useEffect } from "react";
import axios from "axios";
// Components
import NewProgressBar from "@/components/molecules/NewProgressBar";

// Styles
import classes from "./FormsDinamic.module.css";

const Formulario = ({ datos, index, onFormSent, isSelected }) => {
    const [formData, setFormData] = useState({
        idog: datos["idog"],
        zip_code: datos["zip_code"] || "",
        province_name: datos["province_name"],
        locality_name: datos["locality_name"],
        enabled_place: datos["enabled_place"],
        isActive: datos["isActive"],
        zone: datos["zone"] || "",
        code: datos["code"] || "",
    });
    useEffect(() => {
        const hasDataChanged = Object.keys(formData).some(
            (key) => formData[key] !== datos[key]
        );
        if (hasDataChanged) {
            setFormData((prevData) => ({
                ...prevData,
                ...datos,
            }));
        }
    }, [datos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data a enviar", formData);
        const runUpdateDB = async () => {
            await axios
                .get(
                    "https://back-test.derservicios.com.ar/runUpdaterEnabledPlacesProcess"
                )
                .then(({ data }) => {
                    console.log("Base de datos actualizada con exito");
                })
                .catch((error) => {
                    console.log(
                        "Error durante la actualizacion de la DB para enviar la informacion",
                        error
                    );
                    alert("Error al actualizar base de datos");
                });
        };
        try {
            runUpdateDB();
            const response = await axios.post(
                "https://back-test.derservicios.com.ar/runViewInserterP2",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                alert("Datos enviados exitosamente");
                onFormSent(); // Llama a la función de actualización
            } else {
                alert("Error al enviar datos al backend");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo enviar la informacion del formulario");
        }
    };

    return (
        <div className={classes["form-container"]}>
            <div className={classes["form-inputs-container"]}>
                <div className={classes["first-column"]}>
                    <div className={classes.formGroup}>
                        <label htmlFor="name">Localidad Buspack:</label>
                        <input
                            type="text"
                            id="locality_name"
                            name="locality_name"
                            value={formData["locality_name"]}
                            className={classes.input}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="name">Localidad Sait:</label>
                        <input
                            type="text"
                            id="enabled_place"
                            name="enabled_place"
                            value={formData["enabled_place"]}
                            className={classes.input}
                            // onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="name">Provincia:</label>
                        <input
                            type="text"
                            id="province_name"
                            name="province_name"
                            value={formData["province_name"]}
                            className={classes.input}
                            // onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>

                <div className={classes["second-column"]}>
                    <div className={classes.formGroup}>
                        <label htmlFor="name">Codigo Postal:</label>
                        <input
                            type="text"
                            id="zip_code"
                            name="zip_code"
                            value={formData.zip_code || ""}
                            className={classes.input}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={classes.formGroup}>
                        <label htmlFor="zone">Zona:</label>
                        <select
                            id="zone"
                            name="zone"
                            value={formData.zone || ""}
                            className={classes.input}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar Zona</option>
                            <option value="caba">CABA</option>
                            <option value="amba">AMBA</option>
                            <option value="inside_pba">PBA</option>
                            <option value="inside1">INTERIOR 1</option>
                            <option value="inside2">INTERIOR 2</option>
                            <option value="inside3">INTERIOR 3</option>
                            <option value="Iinside4">INTERIOR 4</option>
                        </select>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className={classes.submitButton}
                onClick={handleSubmit}
            >
                Enviar Informacion
            </button>
        </div>
    );
};

// Componente de Paginación
const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
    // Calcula si hay una página anterior
    const hasPreviousPage = currentPage > 1;

    // Calcula si hay una página siguiente
    const hasNextPage = currentPage < totalPages;

    // Función para cambiar a la página anterior
    const goToPreviousPage = () => {
        if (hasPreviousPage) {
            onPageChange(currentPage - 1);
        }
    };

    // Función para cambiar a la página siguiente
    const goToNextPage = () => {
        if (hasNextPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={classes["buttons-pagination-container"]}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-left"
                onClick={goToPreviousPage}
                disabled={!hasPreviousPage}
            >
                <polyline points="15 18 9 12 15 6"></polyline>
                Anterior
            </svg>
            <span>
                Página {currentPage}/{totalPages}
            </span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-right"
                onClick={goToNextPage}
                disabled={!hasNextPage}
            >
                <polyline points="9 18 15 12 9 6"></polyline>
                Siguiente
            </svg>
        </div>
    );
};

// Componente Principal FormsDinamic
const FormsDinamic = ({
    formulariosPerPage,
    formularios,
    setFormDataAxios,
    handleLastFormSent,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleFormSent = (index) => {
        console.log("Formulario enviado: Numero", index);
        const newFormularios = formularios.filter((_, i) => i !== index);
        setFormDataAxios(newFormularios);
        setCurrentPage(1); // Reiniciar a la primera página después de enviar un formulario
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(formularios.length / formulariosPerPage);

    // Calcular el índice del primer formulario en la página actual
    const indexOfLastFormulario = currentPage * formulariosPerPage;
    const indexOfFirstFormulario = indexOfLastFormulario - formulariosPerPage;

    // Obtener los formularios actuales para mostrar en la página
    const currentFormularios = formularios.slice(
        indexOfFirstFormulario,
        indexOfLastFormulario
    );

    // si no hay mas paginas se cierra la modal
    if (currentFormularios.length === 0) {
        handleLastFormSent(false);
    }

    return (
        <div className={classes["steps-navigation-container"]}>
            <h1>Formularios a completar</h1>
            {/* Renderizar formularios actuales */}
            {currentFormularios.map((formulario, index) => (
                <Formulario
                    key={index}
                    index={indexOfFirstFormulario + index}
                    datos={formulario}
                    onFormSent={() =>
                        handleFormSent(indexOfFirstFormulario + index)
                    }
                />
            ))}
            {/* Renderizar paginación */}
            <Paginacion
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </div>
    );
};

export default FormsDinamic;
