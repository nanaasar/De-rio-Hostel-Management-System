import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/rooms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RoomController::index
 * @see app/Http/Controllers/RoomController.php:17
 * @route '/rooms'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\RoomController::store
 * @see app/Http/Controllers/RoomController.php:29
 * @route '/rooms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/rooms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RoomController::store
 * @see app/Http/Controllers/RoomController.php:29
 * @route '/rooms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoomController::store
 * @see app/Http/Controllers/RoomController.php:29
 * @route '/rooms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RoomController::store
 * @see app/Http/Controllers/RoomController.php:29
 * @route '/rooms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RoomController::store
 * @see app/Http/Controllers/RoomController.php:29
 * @route '/rooms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RoomController::update
 * @see app/Http/Controllers/RoomController.php:64
 * @route '/rooms/{room}'
 */
export const update = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/rooms/{room}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\RoomController::update
 * @see app/Http/Controllers/RoomController.php:64
 * @route '/rooms/{room}'
 */
update.url = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { room: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { room: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        room: typeof args.room === 'object'
                ? args.room.id
                : args.room,
                }

    return update.definition.url
            .replace('{room}', parsedArgs.room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoomController::update
 * @see app/Http/Controllers/RoomController.php:64
 * @route '/rooms/{room}'
 */
update.patch = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RoomController::update
 * @see app/Http/Controllers/RoomController.php:64
 * @route '/rooms/{room}'
 */
    const updateForm = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RoomController::update
 * @see app/Http/Controllers/RoomController.php:64
 * @route '/rooms/{room}'
 */
        updateForm.patch = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\RoomController::destroy
 * @see app/Http/Controllers/RoomController.php:103
 * @route '/rooms/{room}'
 */
export const destroy = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/rooms/{room}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RoomController::destroy
 * @see app/Http/Controllers/RoomController.php:103
 * @route '/rooms/{room}'
 */
destroy.url = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { room: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { room: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        room: typeof args.room === 'object'
                ? args.room.id
                : args.room,
                }

    return destroy.definition.url
            .replace('{room}', parsedArgs.room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RoomController::destroy
 * @see app/Http/Controllers/RoomController.php:103
 * @route '/rooms/{room}'
 */
destroy.delete = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RoomController::destroy
 * @see app/Http/Controllers/RoomController.php:103
 * @route '/rooms/{room}'
 */
    const destroyForm = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RoomController::destroy
 * @see app/Http/Controllers/RoomController.php:103
 * @route '/rooms/{room}'
 */
        destroyForm.delete = (args: { room: number | { id: number } } | [room: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const rooms = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default rooms