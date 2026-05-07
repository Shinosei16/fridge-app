<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DislikedIngredient whereUserId($value)
 */
	class DislikedIngredient extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property numeric $quantity
 * @property string $default_unit
 * @property string $purchased_at
 * @property int $expiry_days
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereDefaultUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereExpiryDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient wherePurchasedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Ingredient whereUserId($value)
 */
	class Ingredient extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $recipe_id
 * @property string|null $planned_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Recipe $recipe
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan wherePlannedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan whereRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MealPlan whereUserId($value)
 */
	class MealPlan extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Ingredient> $ingredients
 * @property-read int|null $ingredients_count
 * @property-read \App\Models\MealPlan|null $mealPlan
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Recipe whereUserId($value)
 */
	class Recipe extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ShoppingListItem> $items
 * @property-read int|null $items_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingList whereUserId($value)
 */
	class ShoppingList extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $shopping_list_id
 * @property string $name
 * @property numeric $quantity
 * @property string $unit
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ShoppingList $shoppingList
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereShoppingListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShoppingListItem whereUpdatedAt($value)
 */
	class ShoppingListItem extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DislikedIngredient> $dislikedIngredients
 * @property-read int|null $disliked_ingredients_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Ingredient> $ingredients
 * @property-read int|null $ingredients_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MealPlan> $mealPlans
 * @property-read int|null $meal_plans_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Recipe> $recipes
 * @property-read int|null $recipes_count
 * @property-read \App\Models\ShoppingList|null $shoppingList
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

