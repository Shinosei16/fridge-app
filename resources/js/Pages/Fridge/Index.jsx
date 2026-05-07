import { useState, useEffect} from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [ingredients, setIngredients] = useState([])
    const [editingId, setEditingId] = useState(null)

    const fetchIngredients = async () => {
        await axios.get('/sanctum/csrf-cookie')
        const response = await axios.get('/api/ingredients')
        setIngredients(response.data)
    }

    const [form, setForm] = useState({
        name: '',
        quantity: '',
        default_unit: 'g',
        purchased_at: '',
        expiry_date: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.get('/sanctum/csrf-cookie')
        const response = await axios.post('/api/ingredients', form)
        fetchIngredients()
        setForm({
            name: '',
            quantity: '',
            default_unit: 'g',
            purchased_at: '',
            expiry_date: '',
        })
    }

    const handleDelete = async (id) => {
        await axios.delete(`/api/ingredients/${id}`)
        fetchIngredients()
    }

    const handleEdit = (ingredient) => {
        setEditingId(ingredient.id)
        setForm({
            name: ingredient.name,
            quantity: ingredient.quantity,
            default_unit: ingredient.default_unit,
            purchased_at: ingredient.purchased_at,
            expiry_date: ingredient.expiry_date,
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        await axios.put(`/api/ingredients/${editingId}`, form)
        setEditingId(null)
        fetchIngredients()
        setForm({
            name: '',
            quantity: '',
            default_unit: 'g',
            purchased_at: '',
            expiry_date: '',
        })
    }

    const getDaysLeft = (expiryDate) => {
        if (!expiryDate) return null
        const [year, month, day] = expiryDate.split('-').map(Number)
        const expiry = new Date(year, month - 1, day)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
        return diff
    }

    const getBadgeColor = (daysLeft) => {
        if (daysLeft < 0) return 'bg-red-500'
        if (daysLeft <= 1) return 'bg-orange-500'
        return 'bg-green-500'
    }

    useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            fetchIngredients()
        })
    }, [])

    return (
    <AuthenticatedLayout>
        <Head title="冷蔵庫" />
        <div className="py-0 sm:py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">冷蔵庫</h2>
                    <form onSubmit={editingId ? handleUpdate : handleSubmit} className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-2 sm:flex-wrap">
                            <input
                                type="text"
                                placeholder="食材名"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                className="border rounded p-2 w-full sm:w-auto"
                            />
                            <input
                                type="number"
                                placeholder="数量"
                                value={form.quantity}
                                onChange={e => setForm({...form, quantity: e.target.value})}
                                className="border rounded p-2 w-full sm:w-auto"
                            />
                            <select
                                value={form.default_unit}
                                onChange={e => setForm({...form, default_unit: e.target.value})}
                                className="border rounded p-2 w-full sm:w-auto"
                            >
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="個">個</option>
                                <option value="本">本</option>
                                <option value="枚">枚</option>
                                <option value="袋">袋</option>
                                <option value="適量">適量</option>
                            </select>
                            <p>購入日</p>
                            <input
                                type="date"
                                value={form.purchased_at}
                                onChange={e => setForm({...form, purchased_at: e.target.value})}
                                className="border rounded p-2 w-full sm:w-auto"
                            />
                            <p>賞味期限</p>
                            <input
                                type="date"
                                value={form.expiry_date}
                                onChange={e => setForm({...form, expiry_date: e.target.value})}
                                className="border rounded p-2 w-full sm:w-auto"
                            />
                            <button type="submit" className="bg-blue-500 text-white rounded p-2 px-4">
                                {editingId ? '更新' : '追加'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null)
                                        setForm({ name: '', quantity: '', default_unit: 'g', purchased_at: '', expiry_date: ''})
                                    }}
                                    className="bg-gray-500 text-white rounded p-2 px-4"
                                >
                                    キャンセル
                                </button>
                            )}
                        </div>
                    </form>
                    {ingredients.map(ingredient => {
                        const daysLeft = getDaysLeft(ingredient.expiry_date)
                        return (
                            <div key={ingredient.id} className="flex justify-between items-center border-b py-2">
                                <span>
                                    {ingredient.name}{parseFloat(ingredient.quantity)}{ingredient.default_unit}
                                </span>
                                <div className="flex gap-2 items-center">
                                    {daysLeft !== null && (
                                            <span className={`${getBadgeColor(daysLeft)} text-white rounded px-2 py-1 text-xs`}>
                                                {daysLeft < 0 ? '期限切れ' : `あと${daysLeft}日`}
                                            </span>
                                    )}
                                    <button
                                        onClick={() => handleEdit(ingredient)}
                                        className="bg-yellow-500 text-white rounded px-3 py-1 text-sm"
                                    >
                                        編集
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ingredient.id)}
                                        className="bg-red-500 text-white rounded px-3 py-1 text-sm"
                                    >
                                        削除
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
)
}