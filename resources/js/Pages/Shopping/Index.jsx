import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [shoppingList, setShoppingList] = useState(null)
    const [jsonInput, setJsonInput] = useState('')

    const fetchShoppingList = async () => {
        const response = await axios.get('/api/shopping-list')
        setShoppingList(response.data)
    }

    useEffect(() => {
        fetchShoppingList()
    }, [])

    const handleJsonParse = async () => {
        try {
            const parsed = JSON.parse(jsonInput)
            await axios.post('/api/shopping-list/items', { items: parsed.items })
            setJsonInput('')
            fetchShoppingList()
        } catch (e) {
            alert('JSONの形式が正しくありません')
        }
    }

    const handlePurchased = async (itemId) => {
        await axios.post(`/api/shopping-list/items/${itemId}/purchased`)
        fetchShoppingList()
    }

    const handleNotPurchased = async (itemId) => {
        await axios.delete(`/api/shopping-list/items/${itemId}`)
        fetchShoppingList()
    }

    const [form, setForm] = useState({
        name: '',
        quantity: '',
        unit: 'g',
    })

    const handleAddItem = async (e) => {
        e.preventDefault()
        await axios.post('/api/shopping-list/items', { 
            items: [{ name: form.name, quantity: form.quantity, unit: form.unit }] 
        })
        setForm({ name: '', quantity: '', unit: 'g' })
        fetchShoppingList()
    }

    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({ quantity: '', unit: '' })

    const handleEdit = (item) => {
        setEditingId(item.id)
        setEditForm({ quantity: item.quantity, unit: item.unit })
    }

    const handleUpdate = async (itemId) => {
        await axios.put(`/api/shopping-list/items/${itemId}`, editForm)
        setEditingId(null)
        fetchShoppingList()
    }

    return (
        <AuthenticatedLayout>
            <Head title="買い物リスト" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">買い物リスト</h2>

                        {/* JSON貼り付け */}
                        <div className="mb-6">
                            <p className="font-bold mb-2">AIの出力を貼り付け</p>
                            <textarea
                                value={jsonInput}
                                onChange={e => setJsonInput(e.target.value)}
                                className="border rounded p-2 w-full h-32 mb-2"
                                placeholder='{"items":[{"name":"鶏肉","quantity":300,"unit":"g"}]}'
                            />
                            <button
                                onClick={handleJsonParse}
                                className="bg-green-500 text-white rounded p-2 px-4"
                            >
                                リストに反映
                            </button>
                        </div>

                        <form onSubmit={handleAddItem} className="flex gap-2 flex-wrap mb-6">
                            <input
                                type="text"
                                placeholder="食材名"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                className="border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="数量"
                                value={form.quantity}
                                onChange={e => setForm({...form, quantity: e.target.value})}
                                className="border rounded p-2 w-24"
                            />
                            <select
                                value={form.unit}
                                onChange={e => setForm({...form, unit: e.target.value})}
                                className="border rounded p-2"
                            >
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="個">個</option>
                                <option value="本">本</option>
                                <option value="枚">枚</option>
                                <option value="袋">袋</option>
                                <option value="適量">適量</option>
                            </select>
                            <button type="submit" className="bg-blue-500 text-white rounded p-2 px-4">
                                追加
                            </button>
                        </form>

                        <hr className="mb-6" />

                        {/* 買い物リスト */}
                        {shoppingList && shoppingList.items && shoppingList.items.length > 0 ? (
                            shoppingList.items.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b py-3">
                                    {editingId === item.id ? (
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="number"
                                            value={editForm.quantity}
                                            onChange={e => setEditForm({...editForm, quantity: e.target.value})}
                                            className="border rounded p-1 w-20"
                                        />
                                        <select
                                            value={editForm.unit}
                                            onChange={e => setEditForm({...editForm, unit: e.target.value})}
                                            className="border rounded p-1"
                                        >
                                            <option value="g">g</option>
                                            <option value="ml">ml</option>
                                            <option value="個">個</option>
                                            <option value="本">本</option>
                                            <option value="枚">枚</option>
                                            <option value="袋">袋</option>
                                            <option value="適量">適量</option>
                                        </select>
                                        <button
                                            onClick={() => handleUpdate(item.id)}
                                            className="bg-blue-500 text-white rounded px-3 py-1 text-sm"
                                        >
                                            保存
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="bg-gray-500 text-white rounded px-3 py-1 text-sm"
                                        >
                                            キャンセル
                                        </button>
                                    </div>
                                ) : (
                                    <span>{item.name} {parseFloat(item.quantity)}{item.unit}</span>
                                )}
                                <div className="flex gap-2">
                                    {editingId !== item.id && (
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-yellow-500 text-white rounded px-3 py-1 text-sm"
                                        >
                                            編集
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handlePurchased(item.id)}
                                        className="bg-green-500 text-white rounded px-3 py-1 text-sm"
                                    >
                                        買った✓
                                    </button>
                                    <button
                                        onClick={() => handleNotPurchased(item.id)}
                                        className="bg-red-500 text-white rounded px-3 py-1 text-sm"
                                    >
                                        買わなかった
                                    </button>
                                </div>
                            </div>
                            ))
                        ) : (
                            <p className="text-gray-500">買い物リストは空です</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}