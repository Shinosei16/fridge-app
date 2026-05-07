import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [activeTab, setActiveTab] = useState('recipe')
    const [ingredients, setIngredients] = useState([])
    const [dislikedIngredients, setDislikedIngredients] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [otherRequest, setOtherRequest] = useState('')
    const [days, setDays] = useState(3)
    const [generatedPrompt, setGeneratedPrompt] = useState('')

    const fetchData = async () => {
        const [ingredientsRes, dislikedRes] = await Promise.all([
            axios.get('/api/ingredients'),
            axios.get('/api/disliked-ingredients'),
        ])
        setIngredients(ingredientsRes.data)
        setDislikedIngredients(dislikedRes.data)
    }

    const handleIngredientToggle = (ingredient) => {
        setSelectedIngredients(prev =>
            prev.find(i => i.id === ingredient.id)
                ? prev.filter(i => i.id !== ingredient.id)
                : [...prev, ingredient]
        )
    }

    const handleGeneratePrompt = async () => {
        if (activeTab === 'recipe' && selectedIngredients.length === 0) {
            alert('使いたい食材を選択してください')
            return
        }
        const endpoint = activeTab === 'recipe' ? '/api/prompts/recipe' : '/api/prompts/shopping'
        const payload = activeTab === 'recipe'
            ? { selected_ingredients: selectedIngredients, other_request: otherRequest }
            : { days, other_request: otherRequest }
        const response = await axios.post(endpoint, payload)
        setGeneratedPrompt(response.data.prompt)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt)
        alert('コピーしました！')
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AuthenticatedLayout>
            <Head title="プロンプト生成" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">プロンプト生成</h2>

                        {/* タブ */}
                        <div className="flex border-b mb-6">
                            <button
                                onClick={() => setActiveTab('recipe')}
                                className={`px-4 py-2 ${activeTab === 'recipe' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            >
                                レシピ用
                            </button>
                            <button
                                onClick={() => setActiveTab('shopping')}
                                className={`px-4 py-2 ${activeTab === 'shopping' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                            >
                                買い物リスト用
                            </button>
                        </div>

                        {/* レシピ用タブ */}
                        {activeTab === 'recipe' && (
                            <div>
                                <p className="font-bold mb-2">使いたい食材（冷蔵庫から選択）</p>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedIngredients(ingredients)}
                                        className="text-sm text-blue-500 underline"
                                    >
                                        全て選択
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedIngredients([])}
                                        className="text-sm text-gray-500 underline"
                                    >
                                        全て解除
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {ingredients.map(ingredient => (
                                        <button
                                            key={ingredient.id}
                                            onClick={() => handleIngredientToggle(ingredient)}
                                            className={`px-3 py-1 rounded-full border text-sm ${
                                                selectedIngredients.find(i => i.id === ingredient.id)
                                                    ? 'bg-blue-500 text-white border-blue-500'
                                                    : 'bg-white text-gray-700 border-gray-300'
                                            }`}
                                        >
                                            {ingredient.name}
                                        </button>
                                    ))}
                                </div>
                                {activeTab === 'recipe' && selectedIngredients.length === 0 && (
                                    <p className="text-red-500 text-sm mb-4">使いたい食材を選択してください</p>
                                )}
                            </div>
                        )}

                        {/* 買い物リスト用タブ */}
                        {activeTab === 'shopping' && (
                            <div className="mb-4">
                                <p className="font-bold mb-2">何日分？</p>
                                <input
                                    type="number"
                                    value={days}
                                    onChange={e => setDays(e.target.value)}
                                    className="border rounded p-2 w-24"
                                />
                            </div>
                        )}

                        {/* 使いたくない食材 */}
                        <div className="mb-4">
                            <p className="font-bold mb-2">使いたくない食材（自動表示）</p>
                            <div className="flex flex-wrap gap-2">
                                {dislikedIngredients.map(item => (
                                    <span key={item.id} className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* その他 */}
                        <div className="mb-4">
                            <p className="font-bold mb-2">その他（自由入力）</p>
                            <input
                                type="text"
                                placeholder="30分以内、和食で など"
                                value={otherRequest}
                                onChange={e => setOtherRequest(e.target.value)}
                                className="border rounded p-2 w-full"
                            />
                        </div>

                        <button
                            onClick={handleGeneratePrompt}
                            className="bg-blue-500 text-white rounded p-2 px-4 mb-4"
                        >
                            プロンプトを生成
                        </button>

                        {/* 生成されたプロンプト */}
                        {generatedPrompt && (
                            <div>
                                <p className="font-bold mb-2">生成されたプロンプト</p>
                                <textarea
                                    value={generatedPrompt}
                                    readOnly
                                    className="border rounded p-2 w-full h-32 mb-2"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="bg-gray-500 text-white rounded p-2 px-4"
                                >
                                    コピーする
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}