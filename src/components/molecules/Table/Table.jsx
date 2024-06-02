"use client";

// Hooks
import { useState } from "react";
import axios from "axios";

// Styles
import classes from "./Table.module.css";

// Icons
import { IconRun } from "@/assets/icons";

// Components
import TableField from "@/components/molecules/TableField";
import Spinner from "@/components/atoms/Spinner";
import Modal from "@/components/molecules/Modal";

const Table = () => {
    const [isLoading, setLoading] = useState(false);

    const runUpdate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            const runUpdateDB = async () => {
                await axios
                    .get("https://back-test.derservicios.com.ar/runUpdaterEnabledPlacesProcess")
                    .then(({ data }) => {
                        alert("Base de datos actualizada con exito");
                    })
                    .catch((error) => {
                        console.log("Error al actualizar base de datos", error);
                        alert("Error al actualizar base de datos");
                    });
            };
            runUpdateDB();
        }, 5000);
    };

    return (
        <div className={classes["table-container"]}>
            <div className={classes["table-title"]}>
                <ol className={classes["title"]}>
                    <li>Procesos</li>
                    <li>Actualizado</li>
                    <li>Informacion </li>
                    <li>Estado</li>
                    <li>Acciones</li>
                </ol>
            </div>

            <TableField name="update proccess 1" />
            <div className={classes["table-campos"]}>
                <ol>
                    <li>Actualizar Destinos</li>
                    <li>------</li>
                    <li>------</li>
                    <li>------</li>
                    <li className={classes["icon-svg"]}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#f28e2a"
                            strokeWidth="2"
                            className="feather feather-play"
                            onClick={runUpdate}
                        >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </li>
                </ol>

                {isLoading && (
                    <Modal>
                        <Spinner />
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Table;
