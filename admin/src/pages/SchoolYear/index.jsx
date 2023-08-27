import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { AxiosAPI, endpoints } from "~/configs/AxiosAPI";
import { useAlertContext } from "~/hook/useAlertContext";
import { handleDatetime } from "~/utils/datetime";

function SchoolYear() {
    const [, setAlert] = useAlertContext();

    const [edit, setEdit] = useState(null);
    const [sy, setSy] = useState({
        name: "",
        start: "",
        end: "",
    });
    const [sys, setSys] = useState([]);

    const getSys = async () => {
        await AxiosAPI.get(endpoints.schoolyear)
            .then((res) => setSys(res.data.data))
            .catch((err) => console.log(err.respponse.data || err));
    };

    useEffect(() => {
        getSys();
    }, []);

    const handleChange = (e, field) => {
        setSy({
            ...sy,
            [field]: e.target.value,
        });
    };

    const handleEdit = (id) => {
        setEdit(id);
        console.log(sys.find((item) => item._id === id));
    };

    const handleDelete = async (id) => {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        await AxiosAPI.post(`${endpoints.schoolyear}/create`, sy)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err.response?.data || err));
    };

    return (
        <div>
            <h2>School Year</h2>
            <Table>
                <thead className="text-center">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {sys?.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{handleDatetime(item.start)}</td>
                                <td>{handleDatetime(item.end)}</td>
                                <td>
                                    <Button
                                        onClick={() => handleEdit(item._id)}
                                        className="mx-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(item._id)}
                                        variant="outline-danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <h2
                onClick={() => {
                    setEdit(null);
                    setSy("");
                }}
            >
                {edit ? "Edit mode" : "Create mode"}
            </h2>
            <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Group className="flex-fill" controlId="username">
                    <Form.Control
                        value={sy.name}
                        onChange={(e) => handleChange(e, "name")}
                        type="text"
                        placeholder="Enter name here ..."
                    />
                </Form.Group>
                <Form.Group className="flex-fill mx-2" controlId="username">
                    <Form.Control
                        value={sy.start}
                        onChange={(e) => handleChange(e, "start")}
                        type="date"
                        placeholder="Enter classname here ..."
                    />
                </Form.Group>
                <Form.Group className="flex-fill mx-2" controlId="username">
                    <Form.Control
                        value={sy.end}
                        onChange={(e) => handleChange(e, "end")}
                        type="date"
                        placeholder="Enter classname here ..."
                    />
                </Form.Group>

                <Button
                    style={{
                        height: "38px",
                        marginLeft: "10px",
                        width: "100px",
                    }}
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SchoolYear;
