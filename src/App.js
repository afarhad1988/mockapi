import React, {useEffect, useState} from 'react';
import AddUserModal from "./components/AddUserModal/AddUserModal";
import axios from "axios";

const App = () => {
	const [students, setStudents] = useState([])
	const [loader, setIsLoader] = useState(true)
	const [openModal, setOpenModal] = useState(false)
	const [editingUser, setEditingUser] = useState(null)
	useEffect(() => {
		axios.get('https://6298e09cf2decf5bb74d8896.mockapi.io/students')
				.then((res) => {
					setStudents(res.data)
					setIsLoader(false)
				})
	}, [])
	const deleteUser = async (id) => {
		await axios.delete(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${id}`)
		const studentsList = students.filter(item => item.id !== id)
		setStudents(studentsList)
	}
	const handleEdit =(student)=>{
		setEditingUser(student)
		setOpenModal(true)
	}
	if (loader) {
		return "Loading...."
	}
	return (
			<div className='app'>
				{
					openModal &&
							<AddUserModal setOpenModal = {setOpenModal} students={students} setStudents={setStudents} editingUser={editingUser} setEditingUser={setEditingUser}/>
				}
				<button onClick={() => setOpenModal(true)}
						className="rounded-xl border  py-1 px-4 text-primary inline-blockrounded bg-fuchsia-700 hover:bg-fuchsia-600 hover:text-black text-white my-6">
					Добавить студента
				</button>

				<table className="table-auto w-full">
					<thead>
					<tr className="bg-fuchsia-500 text-center ">
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent py-2">
							#
						</th>
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
							Ф.И.О
						</th>
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
							Группа
						</th>
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
							Год поступления
						</th>
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
							Телефон
						</th>
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
							Email
						</th>
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
							Settings
						</th>
					</tr>
					</thead>
					<tbody>
					{
						students.map((student) => (
								<tr className='bg-neutral-300 border-y-2' key={student.id}>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										{student.id}
									</td>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										{student.name}
									</td>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										{student.group}
									</td>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										{student.year}
									</td>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										{student.phone}
									</td>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										{student.email}
									</td>
									<td className=" text-center text-darkfont-mediumtext-basepy-5   px-2bg-[#F3F6FF]border-b border-l border-[#E8E8E8] ">
										<button onClick={() => handleEdit(student)}
												className="hover:bg-green-400 hover:text-black rounded-xl border border-green-400 py-1 px-4 text-primary inline-blockrounded bg-green-500 mr-2 text-white">
											Edit
										</button>
										<button onClick={() => deleteUser(student.id)}
												className="hover:bg-red-400 hover:text-black rounded-xl border border-red-400 py-1 px-4 text-primary inline-blockrounded bg-red-500 text-white">
											Delete
										</button>
									</td>

								</tr>
						))
					}

					</tbody>
				</table>
			</div>
	);
};
export default App;
