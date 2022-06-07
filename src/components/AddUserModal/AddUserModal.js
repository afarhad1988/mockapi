import React, {useState} from 'react';
import axios from "axios";

const AddUserModal = ({students, setStudents, setOpenModal, editingUser, setEditingUser}) => {
	// const [updateUserId, setUpdateUserId] = useState(null)
	const [infoStudent, setInfoStudent] = useState({
		name: editingUser?.name || '',
		group: editingUser?.group || '',
		year: editingUser?.year || '',
		phone: editingUser?.phone || '',
		email: editingUser?.email || ''
	})
	const updateUser = async (e) => {
		e.preventDefault()
		const {data: updatedUser} = await axios.put(`https://6298e09cf2decf5bb74d8896.mockapi.io/students/${editingUser.id}`, infoStudent)
		const updateStudentList = students.map(item => item.id === editingUser.id ? updatedUser : item)
		setStudents(updateStudentList)
		setOpenModal(false)
		setInfoStudent({
			name: ''
		})
	}
	const handleChange = (e) => {
		setInfoStudent({...infoStudent, [e.target.name]: e.target.value})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const uploadUser = await axios.post('https://6298e09cf2decf5bb74d8896.mockapi.io/students', infoStudent)
		setStudents([...students, uploadUser.data])
		setInfoStudent({name: "", group: "", year: "", phone: "", email: ""})
		setOpenModal(false)
	}
	return (
			<div className='fixed justify-center flex w-full bg-white p-6 '>
				<div className='absolute right-9 top-9 cursor-pointer' onClick={() => {
					setOpenModal(false)
					setEditingUser(null)
				}}>x
				</div>
				<form onSubmit={editingUser ? updateUser : handleSubmit} className='mb-10 mt-10 w-full'>
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
								<button className=' rounded-xl w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>{editingUser ? "Save" : "Create"}
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
	);
};
export default AddUserModal;
