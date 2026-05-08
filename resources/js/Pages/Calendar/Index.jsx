import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [recipes, setRecipes] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [draggedRecipe, setDraggedRecipe] = useState(null)

    const fetchRecipes = async () => {
        const response = await axios.get('/api/recipes')
        setRecipes(response.data)
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const formatDate = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }

    const getRecipesForDate = (dateStr) => {
        return recipes.filter(recipe => 
            recipe.meal_plan && recipe.meal_plan.planned_date === dateStr
        )
    }

    const getUnscheduledRecipes = () => {
        return recipes.filter(recipe => !recipe.meal_plan || !recipe.meal_plan.planned_date)
    }

    const handleDragStart = (recipe) => {
        setDraggedRecipe(recipe)
    }

    const handleDrop = async (dateStr) => {
        if (!draggedRecipe) return
        
        if (draggedRecipe.meal_plan) {
            await axios.put(`/api/meal-plans/${draggedRecipe.meal_plan.id}`, {
                planned_date: dateStr
            })
        } else {
            await axios.post('/api/meal-plans', {
                recipe_id: draggedRecipe.id,
                planned_date: dateStr
            })
        }
        
        setDraggedRecipe(null)
        fetchRecipes()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const [touchDragging, setTouchDragging] = useState(null)
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

    const handleTouchStartDrag = (e, recipe) => {
        setTouchDragging(recipe)
        setTouchPosition({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
    }

    const handleTouchMoveDrag = (e) => {
        if (!touchDragging) return
        setTouchPosition({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
    }

    const handleTouchEndDrag = async (e) => {
        if (!touchDragging) return
        
        // タッチ終了位置の要素を取得
        const element = document.elementFromPoint(touchPosition.x, touchPosition.y)
        const dropTarget = element?.closest('[data-date]')
        
        if (dropTarget) {
            const dateStr = dropTarget.getAttribute('data-date')
            await handleDrop(dateStr)
        } else {
            const unscheduledTarget = element?.closest('[data-unscheduled]')
            if (unscheduledTarget && touchDragging.meal_plan) {
                await axios.put(`/api/meal-plans/${touchDragging.meal_plan.id}`, {
                    planned_date: null
                })
                fetchRecipes()
            }
        }
        
        setTouchDragging(null)
    }

    const [selectedRecipe, setSelectedRecipe] = useState(null)

    const handleRecipeTap = (recipe) => {
        if (selectedRecipe?.id === recipe.id) {
            setSelectedRecipe(null) // 同じレシピをタップで選択解除
        } else {
            setSelectedRecipe(recipe)
        }
    }

    const handleDateTap = async (dateStr) => {
        if (!selectedRecipe) return
        
        if (selectedRecipe.meal_plan) {
            await axios.put(`/api/meal-plans/${selectedRecipe.meal_plan.id}`, {
                planned_date: dateStr
            })
        } else {
            await axios.post('/api/meal-plans', {
                recipe_id: selectedRecipe.id,
                planned_date: dateStr
            })
        }
        
        setSelectedRecipe(null)
        fetchRecipes()
    }

    const handleUnscheduledTap = async () => {
        if (!selectedRecipe || !selectedRecipe.meal_plan) return
        await axios.put(`/api/meal-plans/${selectedRecipe.meal_plan.id}`, {
            planned_date: null
        })
        setSelectedRecipe(null)
        fetchRecipes()
    }

    return (
        <AuthenticatedLayout>
            <Head title="カレンダー" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">カレンダー</h2>

                        {/* 月移動 */}
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={prevMonth} className="bg-gray-200 rounded px-3 py-1">←</button>
                            <span className="font-bold text-lg">
                                {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                            </span>
                            <button onClick={nextMonth} className="bg-gray-200 rounded px-3 py-1">→</button>
                        </div>

                        {selectedRecipe && (
                            <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded flex justify-between items-center">
                                <span className="text-sm text-yellow-800">
                                    {selectedRecipe.title}
                                </span>
                                <button
                                    onClick={() => setSelectedRecipe(null)}
                                    className="text-yellow-800 text-xs underline"
                                >
                                    キャンセル
                                </button>
                            </div>
                        )}

                        {/* カレンダー */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                                <div key={day} className="text-center text-sm font-bold py-1">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-6">
                            {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                                const day = i + 1
                                const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
                                const dayRecipes = getRecipesForDate(dateStr)
                                return (
                                    <div
                                        key={day}
                                        data-date={dateStr}
                                        onDrop={() => handleDrop(dateStr)}
                                        onDragOver={handleDragOver}
                                        onClick={() => handleDateTap(dateStr)}
                                        className={`border rounded min-h-16 p-1 ${selectedRecipe ? 'cursor-pointer hover:bg-blue-50' : ''}`}
                                    >
                                        <div className="text-sm text-gray-500 mb-1">{day}</div>
                                        {dayRecipes.map(recipe => (
                                            <div
                                                key={recipe.id}
                                                draggable
                                                onDragStart={() => handleDragStart(recipe)}
                                                onClick={(e) => { e.stopPropagation(); handleRecipeTap(recipe) }}
                                                className={`text-xs rounded p-1 mb-1 cursor-pointer truncate ${selectedRecipe?.id === recipe.id ? 'bg-yellow-300 text-yellow-800' : 'bg-blue-100 text-blue-700'}`}
                                            >
                                                {recipe.title}
                                            </div>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>

                        {/* 未定のレシピ */}
                        <div
                            data-unscheduled="true"
                            onDrop={async () => {
                                if (!draggedRecipe || !draggedRecipe.meal_plan) return
                                await axios.put(`/api/meal-plans/${draggedRecipe.meal_plan.id}`, {
                                    planned_date: null
                                })
                                setDraggedRecipe(null)
                                fetchRecipes()
                            }}
                            onDragOver={handleDragOver}
                            onClick={handleUnscheduledTap}
                            className="min-h-16 border-2 border-dashed border-gray-300 rounded p-2"
                        >
                            <p className="font-bold mb-2">未定のレシピ</p>
                            <div className="flex flex-wrap gap-2">
                                {getUnscheduledRecipes().map(recipe => (
                                    <div
                                        key={recipe.id}
                                        draggable
                                        onDragStart={() => handleDragStart(recipe)}
                                        onClick={(e) => { e.stopPropagation(); handleRecipeTap(recipe) }}
                                        className={`text-xs rounded p-2 cursor-pointer truncate ${selectedRecipe?.id === recipe.id ? 'bg-yellow-300 text-yellow-800 border-2 border-yellow-400' : 'border-2 border-dashed border-gray-300'}`}
                                    >
                                        {recipe.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}