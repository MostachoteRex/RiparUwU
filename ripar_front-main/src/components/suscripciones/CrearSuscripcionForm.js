import axios from "axios";
import { useEffect, useState } from "react"
import { Form, Row, Col, Alert } from "react-bootstrap"
import { USUARIOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";


function CrearSuscripcionForm({ errores, callback }) {

	const [noContrato, setNoContrato] = useState("");
	const [fechaSuscripcion, setFechaSuscripcion] = useState("");
	const [asesores, setAsesores] = useState([])
	const [valor, setValor] = useState("")
	const [metodoPago, setMetodoPago] = useState("")
	const [documento, setDocumento] = useState("");
	const [nombre, setNombre] = useState("")
	const [primerApellido, setPrimerApellido] = useState("")
	const [segundoApellido, setSegundoApellido] = useState("")
	const [actividadEconomica, setActividadEconomica] = useState("")
	const [telefono, setTelefono] = useState("");
	const [email, setEmail] = useState("");
	const [fechaNacimiento, setFechaNacimiento] = useState("")
	const [direccion, setDireccion] = useState("");
	const [barrio, setBarrio] = useState("")
	const [ciudad, setCiudad] = useState("")
	const [selectedAsesor, setSelectedAsesor] = useState("")

	useEffect(() => {
		axios.get(`${USUARIOSCREADOS_GET_ENDPOINT}/${2}`)
			.then(respuesta => {
				setAsesores(respuesta.data)
			}).catch(e => {
				console.error(e);
			})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		callback({
			noContrato,
			fechaSuscripcion,
			idAsesor: selectedAsesor,
			valor,
			metodoPago,
			documento,
			nombre,
			primerApellido,
			segundoApellido,
			actividadEconomica,
			telefono,
			email,
			fechaNacimiento,
			direccion,
			barrio,
			ciudad,
		});

	};

	return (

		<Form onSubmit={handleSubmit} id="suscripcion-form">
			<Row>
				<Form.Group as={Col} className="mb-3" controlId="tarifaParticular">
					<Form.Label>No. Contrato</Form.Label>
					<Form.Control
						type="text"
						value={noContrato}
						onChange={(e) => setNoContrato(e.target.value)}
					/>
					{errores.noContrato && (
						<Alert variant="danger">{errores.noContrato}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="fechaSuscripcion">
					<Form.Label>Fecha Suscripcion</Form.Label>
					<Form.Control
						type="date"
						value={fechaSuscripcion}
						onChange={(e) => setFechaSuscripcion(e.target.value)}
					/>
					{errores.fechaSuscripcion && (
						<Alert variant="danger">{errores.fechaSuscripcion}</Alert>
					)}
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} className="mb-3">
					<Form.Label>Asesor</Form.Label>
					<Form.Select aria-label="Elija el asesor"
						value={selectedAsesor}
						onChange={(e) => setSelectedAsesor(e.target.value)}
					>
						<option>Seleccione</option>
						{asesores.map((asesor) => (
							<option key={asesor.idUsuario} value={asesor.idUsuario}>
								{asesor.nombre}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="valorSuscripcion">
					<Form.Label>Valor Suscripcion</Form.Label>
					<Form.Control
						type="number"
						value={valor}
						onChange={(e) => setValor(e.target.value)}
					/>
					{errores.valor && (
						<Alert variant="danger">{errores.valor}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3">
					<Form.Label>Método de Pago</Form.Label>
					<Form.Select aria-label="Default select example"
						value={metodoPago}
						onChange={(e) => setMetodoPago(e.target.value)}
					>
						<option>Seleccione</option>
						<option value="1">Trasferencia</option>
						<option value="2">Tarjeta</option>
						<option value="3">Efectivo</option>
					</Form.Select>
				</Form.Group>
			</Row>

			<div>
				<h5>Datos del Suscriptor</h5>
			</div>

			<Row className="mb-3">
				<Form.Group as={Col} className="mb-3" controlId="noDocumento">
					<Form.Label>No. Documento</Form.Label>
					<Form.Control
						type="text"
						value={documento}
						onChange={(e) => setDocumento(e.target.value)}
					/>
					{errores.documento && (
						<Alert variant="danger">{errores.documento}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="nombre">
					<Form.Label>Nombre(s)</Form.Label>
					<Form.Control
						type="text"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
					{errores.nombre && (
						<Alert variant="danger">{errores.nombre}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="primerApellido">
					<Form.Label>Primer Apellido</Form.Label>
					<Form.Control
						type="text"
						value={primerApellido}
						onChange={(e) => setPrimerApellido(e.target.value)}
					/>
					{errores.primerApellido && (
						<Alert variant="danger">{errores.primerApellido}</Alert>
					)}
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} className="mb-3" controlId="segundoApellido">
					<Form.Label>Segundo Apellido</Form.Label>
					<Form.Control
						type="text"
						value={segundoApellido}
						onChange={(e) => setSegundoApellido(e.target.value)}
					/>
					{errores.segundoApellido && (
						<Alert variant="danger">{errores.segundoApellido}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3">
					<Form.Label>Actividad Economica</Form.Label>
					<Form.Select aria-label="Default select example"
						value={actividadEconomica}
						onChange={(e) => setActividadEconomica(e.target.value)}
					>
						<option>Seleccione</option>
						<option value="1">Independiente</option>
						<option value="2">Pensionado</option>
						<option value="3">Asalariado</option>
					</Form.Select>
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="telefono">
					<Form.Label>Telefono</Form.Label>
					<Form.Control
						type="text"
						value={telefono}
						onChange={(e) => setTelefono(e.target.value)}
					/>
					{errores.telefono && (
						<Alert variant="danger">{errores.telefono}</Alert>
					)}
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{errores.email && (
						<Alert variant="danger">{errores.email}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="fechaNacimiento">
					<Form.Label>Fecha de Nacimiento</Form.Label>
					<Form.Control
						type="date"
						value={fechaNacimiento}
						onChange={(e) => setFechaNacimiento(e.target.value)}
					/>
					{errores.fechaNacimiento && (
						<Alert variant="danger">{errores.fechaNacimiento}</Alert>
					)}
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} className="mb-3" controlId="direccion">
					<Form.Label>Dirección</Form.Label>
					<Form.Control
						type="text"
						value={direccion}
						onChange={(e) => setDireccion(e.target.value)}
					/>
					{errores.direccion && (
						<Alert variant="danger">{errores.direccion}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="barrio">
					<Form.Label>Barrio</Form.Label>
					<Form.Control
						type="text"
						value={barrio}
						onChange={(e) => setBarrio(e.target.value)}
					/>
					{errores.barrio && (
						<Alert variant="danger">{errores.barrio}</Alert>
					)}
				</Form.Group>

				<Form.Group as={Col} className="mb-3" controlId="ciudad">
					<Form.Label>Ciudad/Municipio</Form.Label>
					<Form.Control
						type="text"
						value={ciudad}
						onChange={(e) => setCiudad(e.target.value)}
					/>
					{errores.ciudad && (
						<Alert variant="danger">{errores.ciudad}</Alert>
					)}
				</Form.Group>
			</Row>
		</Form>

	)
}

export { CrearSuscripcionForm }