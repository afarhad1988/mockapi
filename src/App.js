import React, {useEffect, useState} from 'react';
import axios, {Axios} from "axios";

const App = () => {
	const [students, setStudents] = useState([])
	const [loader, setIsLoader] = useState(true)
	const [isEditing, setIsEditing] = useState(false)
	const [updateUserId, setUpdateUserId] = useState(null)
	const [infoStudent, setInfoStudent] = useState({name: "", group: "", year: "", phone: "", email: ""})
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
	const handleChange = (e) => {
		setInfoStudent({...infoStudent, [e.target.name]: e.target.value})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const uploadUser = await axios.post('https://6298e09cf2decf5bb74d8896.mockapi.io/students', infoStudent)
		setStudents([...students, uploadUser.data])
		setInfoStudent({name: "", group: "", year: "", phone: "", email: ""})
	}
	const handleEdit = (student)=>{
		setIsEditing(true)
		setUpdateUserId(student.id)
		setInfoStudent({
			name:student.name,
			group: student.group,
			year: student.year,
			phone: student.phone,
			email:student.email
		})
	}
	const updateUser = async (e) =>{
		e.preventDefault()
		const updateUserNew = await axios.put(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${updateUserId}`, infoStudent)
		const updateStudentList =  students.map(item=>item.id === updateUser.data.id ? updateUserNew.data : item)
        setStudents(updateStudentList)
		setIsEditing(false)
		setInfoStudent({
			name:'',
			group: '',
			year: '',
			phone: '',
			email:''
		})
	}
	if (loader) {
		return "Loading...."
	}
	return (
			<div className='app'>
				<form onSubmit={isEditing ? updateUser : handleSubmit} className='mb-10 mt-10'>
					<div className='flex items-center container mx-auto'>
						<div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
							<div className="flex justify-center">
								<div className="flex">
									<h1 className="text-gray-600 font-bold md:text-2xl text-xl">Добавить студента</h1>
								</div>
							</div>
							<div className="grid grid-cols-1 mt-5 mx-7">
								<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Ф.И.О.</label>
								<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									   type="text" required placeholder="Popov" name='name' id='name'
									   onChange={handleChange} value={infoStudent.name}/>

							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Группа
									</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="text" required placeholder="ИПП-22" name='group' id='group'
										   onChange={handleChange} value={infoStudent.group}/>
								</div>
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Год
										поступления</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="date" required placeholder="2022" name='year' id='year'
										   onChange={handleChange} value={infoStudent.year}/>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Телефон</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="text" required placeholder="+996555000001" id='phone' name='phone'
										   onChange={handleChange} value={infoStudent.phone}/>
								</div>
								<div className="grid grid-cols-1">
									<label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email
									</label>
									<input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   type="email" required placeholder="mail@mail.ru" name='email' id='email'
										   onChange={handleChange} value={infoStudent.email}/>
								</div>
							</div>
							<div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
								<button className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>{isEditing ? "Save" : "Create"}
								</button>
							</div>
						</div>
					</div>
				</form>


				<table className="table-auto w-full">
					<thead>
					<tr className="bg-cyan-400 text-center">
						<th className=" w-1/7min-w-[160px] text-lgfont-semibold text-whitepy-4lg:py-7px-3lg:px-4border-l border-transparent">
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
										<button onClick={()=> handleEdit(student)}
												className="border border-green-400 py-1 px-4 text-primary inline-blockrounded bg-green-500 mr-2 text-white">
											Edit
										</button>
										<button onClick={() => deleteUser(student.id)}
												className="border border-red-400 py-1 px-4 text-primary inline-blockrounded bg-red-500 text-white">
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
