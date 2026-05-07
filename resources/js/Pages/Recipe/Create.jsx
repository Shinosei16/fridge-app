import { useState } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Create() {
    const [jsonInput, setJsonInput] = useState('')
    const [form, setForm] = useState({
        title: '',
        description: '',
        ingredients: [],
        planned_date: '',
    })

    const handleJsonParse = () => {
        try {
            const parsed = JSON.parse(jsonInput)
            setForm({
                title: parsed.title || '',
                description: parsed.steps || '',
                ingredients: parsed.ingredients || [],
                planned_date: '',
            })
        } catch (e) {
            alert('JSONの形式が正しくありません')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/api/recipes', form)
        window.location.href = '/recipes'
    }

    return (
        <AuthenticatedLayout>
            <Head title="レシピ登録" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">レシピ登録</h2>

                        {/* JSON貼り付け */}
                        <div className="mb-6">
                            <p className="font-bold mb-2">AIの出力を貼り付け</p>
                            <textarea
                                value={jsonInput}
                                onChange={e => setJsonInput(e.target.value)}
                                className="border rounded p-2 w-full h-32 mb-2"
                                placeholder='{"title":"","steps":"","ingredients":[...]}'
                            />
                            <button
                                type="button"
                                onClick={handleJsonParse}
                                className="bg-green-500 text-white rounded p-2 px-4"
                            >
                                フォームに反映
                            </button>
                        </div>

                        <hr className="mb-6" />

                        {/* フォーム */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <p className="font-bold mb-2">タイトル</p>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={e => setForm({...form, title: e.target.value})}
                                    className="border rounded p-2 w-full"
                                    placeholder="レシピ名"
                                />
                            </div>

                            <div className="mb-4">
                                <p className="font-bold mb-2">手順</p>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({...form, description: e.target.value})}
                                    className="border rounded p-2 w-full h-32"
                                    placeholder="手順を入力"
                                />
                            </div>

                            <div className="mb-4">
                                <p className="font-bold mb-2">使用食材</p>
                                {form.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex gap-2 items-center mb-2">
                                        <span className={`text-xs px-2 py-1 rounded ${ingredient.is_seasoning ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {ingredient.is_seasoning ? '調味料' : '食材'}
                                        </span>
                                        <span>{ingredient.name}</span>
                                        <span className="text-gray-500">{ingredient.quantity}{ingredient.unit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6">
                                <p className="font-bold mb-2">作りたい日（未定の場合は空欄）</p>
                                <input
                                    type="date"
                                    value={form.planned_date}
                                    onChange={e => setForm({...form, planned_date: e.target.value})}
                                    className="border rounded p-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded p-2 px-4"
                            >
                                保存する
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )

}