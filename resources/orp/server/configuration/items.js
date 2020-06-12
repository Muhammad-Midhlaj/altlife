import * as alt from 'alt';

/**
 * Inventory Information
 * All items need a BaseItem
 * BaseItems can have `itemeffects` that do specific things.
 * Icons can be found in client/html/icons
 */

export const BaseItems = {
    weapon: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: true
        },
        slot: 11
    },
    boundweapon: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: false,
            use: true,
            destroy: true,
            sell: false,
            rename: false,
            stack: false
        },
        slot: 11
    },
    food: {
        eventcall: 'itemeffects:Consume',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: true
        },
        slot: -1
    },
    generic: {
        eventcall: '',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: -1
    },
    ingredient: {
        eventcall: '',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: -1
    },
    accessory: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 0
    },
    hat: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 1
    },
    earrings: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 2
    },
    glasses: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 3
    },
    helmet: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 1
    },
    watch: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 5
    },
    backpack: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 6
    },
    shirt: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 7
    },
    mask: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 4
    },
    bodyarmour: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 8
    },
    bracelet: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 9
    },
    pants: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 10
    },
    hand: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 11
    },
    unk: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 14
    },
    shoes: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 13
    },
    uniform: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: false,
            use: true,
            destroy: true,
            sell: true,
            rename: true,
            stack: false
        },
        slot: 14
    },
    pickaxe: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: 11
    },
    shovel: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: 11
    },
    axe: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: 11
    },
    hammer: {
        eventcall: 'itemeffects:EquipItem',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: 11
    },
    fishingrod: {
        eventcall: ['itemeffects:EquipItem', 'job:Fishing'],
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: false
        },
        slot: 11
    },
    unrefined: {
        eventcall: '',
        abilities: {
            drop: true,
            use: false,
            destroy: false,
            sell: true,
            rename: false,
            stack: false
        },
        slot: -1
    },
    refined: {
        eventcall: '',
        abilities: {
            drop: true,
            use: false,
            destroy: false,
            sell: true,
            rename: false,
            stack: true
        },
        slot: -1
    },
    refineddrug: {
        eventcall: 'itemeffects:Consume',
        abilities: {
            drop: true,
            use: false,
            destroy: false,
            sell: true,
            rename: false,
            stack: true
        },
        slot: -1
    },
    license: {
        eventcall: 'itemeffects:ShowLicense',
        abilities: {
            drop: false,
            use: true,
            destroy: true,
            sell: false,
            rename: false,
            stack: false
        },
        slot: -1
    },
    medkit: {
        eventcall: 'itemeffects:UseMedkit',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: true
        },
        slot: -1
    },
    repairkit: {
        eventcall: 'itemeffects:RepairVehicle',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: true
        },
        slot: -1
    },
    gascan: {
        eventcall: 'itemeffects:UseGasCan',
        abilities: {
            drop: true,
            use: true,
            destroy: true,
            sell: true,
            rename: false,
            stack: true
        },
        slot: -1
    },
    rope: {
        eventcall: '',
        abilities: {
            drop: true,
            use: false,
            destroy: true,
            sell: false,
            rename: false,
            stack: false
        }
    },
    cuffs: {
        eventcall: '',
        abilities: {
            drop: false,
            use: false,
            destroy: true,
            sell: false,
            rename: false,
            stack: false
        }
    },
    phone: {
        eventcall: '',
        abilities: {
            drop: false,
            use: false,
            destroy: true,
            sell: false,
            rename: false,
            stack: false
        }
    },
    rawfood: {
        eventcall: 'itemeffects:RawFood',
        abilities: {
            drop: true,
            use: true,
            destroy: false,
            sell: true,
            rename: false,
            stack: false
        }
    },
    rawfish: {
        eventcall: 'itemeffects:RawFood',
        abilities: {
            drop: true,
            use: true,
            destroy: false,
            sell: true,
            rename: false,
            stack: false
        }
    },
    burntfood: {
        eventcall: '',
        abilities: {
            drop: true,
            use: false,
            destroy: false,
            sell: true,
            rename: false,
            stack: false
        }
    },
    cookedfood: {
        eventcall: 'itemeffects:Consume',
        abilities: {
            drop: true,
            use: true,
            destroy: false,
            sell: true,
            rename: false,
            stack: false
        }
    },
    dice: {
        eventcall: '',
        abilities: {
            drop: true,
            use: false,
            destroy: true,
            sell: false,
            rename: false,
            stack: false
        }
    }
};

export const Items = {
    weapon: {
        name: '',
        base: 'weapon',
        key: 'weapon',
        props: {},
        quantity: 0,
        icon: 'weapon'
    },
    boundweapon: {
        name: '',
        base: 'boundweapon',
        key: 'boundweapon',
        props: {},
        quantity: 0,
        icon: 'weapon'
    },
    granolabar: {
        name: 'Granola Bar',
        base: 'food',
        key: 'granolabar',
        props: {
            health: 2
        },
        quantity: 0,
        icon: 'chocolate-bar'
    },
    soda: {
        name: 'Soda',
        base: 'food',
        key: 'soda',
        props: {
            health: 2
        },
        quantity: 0,
        icon: 'soda'
    },
    coffee: {
        name: 'Coffee',
        base: 'food',
        key: 'coffee',
        props: {
            skillbonus: [
                {
                    skill: 'agility',
                    level: 1,
                    time: 60000
                }
            ],
            health: 1
        },
        quantity: 0,
        icon: 'soda'
    },
    rawfish: {
        name: '',
        base: 'rawfish',
        key: 'rawfish',
        props: { xp: 0 },
        quantity: 0,
        icon: 'fish'
    },
    cookedfood: {
        name: '',
        base: 'cookedfood',
        key: 'cookedfood',
        props: { health: 0 },
        quantity: 0,
        icon: 'can'
    },
    hat: {
        name: 'Hat',
        base: 'hat',
        key: 'hat',
        props: {},
        quantity: 0,
        icon: 'hat'
    },
    helmet: {
        name: 'Helmet',
        base: 'helmet',
        key: 'helmet',
        props: {},
        quantity: 0,
        icon: 'hat'
    },
    mask: {
        name: 'Mask',
        base: 'mask',
        key: 'mask',
        props: {},
        quantity: 0,
        icon: 'bandana'
    },
    shirt: {
        name: 'Shirt',
        base: 'shirt',
        key: 'shirt',
        props: {},
        quantity: 0,
        icon: 'shirt'
    },
    pants: {
        name: 'Pants',
        base: 'pants',
        key: 'pants',
        props: {},
        quantity: 0,
        icon: 'trousers'
    },
    shoes: {
        name: 'Shoes',
        base: 'shoes',
        key: 'shoes',
        props: {},
        quantity: 0,
        icon: 'chelsea-boot'
    },
    bodyarmour: {
        name: 'Body Armour',
        base: 'bodyarmour',
        key: 'bodyarmour',
        props: {},
        quantity: 0,
        icon: 'body-armour'
    },
    accessory: {
        name: 'Accessory',
        base: 'accessory',
        key: 'accessory',
        props: {},
        quantity: 0,
        icon: 'accessory'
    },
    earrings: {
        name: 'Earrings',
        base: 'earrings',
        key: 'earrings',
        props: {},
        quantity: 0,
        icon: 'earring'
    },
    backpack: {
        name: 'Backpack',
        base: 'backpack',
        key: 'backpack',
        props: {},
        quantity: 0,
        icon: 'backpack'
    },
    hand: {
        name: 'Hand',
        base: 'hand',
        key: 'hand',
        props: {},
        quantity: 0,
        icon: 'hand'
    },
    watch: {
        name: 'Watch',
        base: 'watch',
        key: 'watch',
        props: {},
        quantity: 0,
        icon: 'watch'
    },
    bracelet: {
        name: 'Bracelet',
        base: 'bracelet',
        key: 'bracelet',
        props: {},
        quantity: 0,
        icon: 'bracelet'
    },
    glasses: {
        name: 'Glasses',
        base: 'glasses',
        key: 'glasses',
        props: {},
        quantity: 0,
        icon: 'glasses'
    },
    unrefinedwood: {
        name: 'Unrefined Wood',
        base: 'unrefined',
        key: 'unrefinedwood',
        props: {},
        quantity: 0,
        icon: 'wood'
    },
    refinedwood: {
        name: 'Refined Wood',
        base: 'refined',
        key: 'refinedwood',
        props: {},
        quantity: 0,
        icon: 'planks'
    },
    unrefinedmetal: {
        name: 'Unrefined Metal',
        base: 'unrefined',
        key: 'unrefinedmetal',
        props: {},
        quantity: 0,
        icon: 'rock'
    },
    refinedmetal: {
        name: 'Refined Metal',
        base: 'refined',
        key: 'refinedmetal',
        props: {},
        quantity: 0,
        icon: 'metal'
    },
    unrefinedkevlarium: {
        name: 'Unrefined Kevlarium',
        base: 'unrefined',
        key: 'unrefinedkevlarium',
        props: {},
        quantity: 0,
        icon: 'leaf'
    },
    refinedkevlarium: {
        name: 'Refined Kevlarium',
        base: 'refineddrug',
        key: 'refinedkevlarium',
        props: {
            armour: 5,
            health: -8
        },
        quantity: 0,
        icon: 'pills'
    },
    unrefinedvigorium: {
        name: 'Unrefined Vigorium Seeds',
        base: 'unrefined',
        key: 'unrefinedvigorium',
        props: {},
        quantity: 0,
        icon: 'seeds'
    },
    refinedvigorium: {
        name: 'Refined Vigorium',
        base: 'refineddrug',
        key: 'refinedvigorium',
        props: {
            skillbonus: [
                {
                    skill: 'agility',
                    level: 5,
                    time: 60000
                }
            ],
            health: -8
        },
        quantity: 0,
        icon: 'syringe'
    },
    pickaxe: {
        name: 'Rusty Pickaxe',
        base: 'pickaxe',
        key: 'pickaxe',
        props: {
            lvl: {
                skill: 'mining',
                requirement: 1,
                bonus: 0
            },
            propData: {
                name: 'prop_tool_pickaxe',
                bone: 57005,
                x: 0.1,
                y: -0.1,
                z: -0.02,
                pitch: 80,
                roll: 0,
                yaw: 170
            }
        },
        quantity: 0,
        icon: 'pickaxe'
    },
    axe: {
        name: 'Rusty Axe',
        base: 'axe',
        key: 'axe',
        props: {
            lvl: {
                skill: 'woodcutting',
                requirement: 0,
                bonus: 0
            },
            propData: {
                name: 'prop_tool_fireaxe',
                bone: 57005,
                x: 0.1,
                y: -0.1,
                z: -0.02,
                pitch: 80,
                roll: 0,
                yaw: 170
            }
        },
        quantity: 0,
        icon: 'axe'
    },
    hammer: {
        name: 'Rusty Hammer',
        base: 'hammer',
        key: 'hammer',
        props: {
            lvl: {
                skill: 'smithing',
                requirement: 0,
                bonus: 0
            },
            propData: {
                name: 'prop_tool_mallet',
                bone: 57005,
                x: 0.1,
                y: 0.1,
                z: 0,
                pitch: 80,
                roll: 0,
                yaw: 180
            }
        },
        quantity: 0,
        icon: 'hammer'
    },
    fishingrod: {
        name: 'Rusty Fishing Rod',
        base: 'fishingrod',
        key: 'fishingrod',
        props: {
            lvl: {
                skill: 'fishing',
                requirement: 0,
                bonus: 0
            },
            propData: {
                name: 'prop_fishing_rod_01',
                bone: 18905,
                x: 0.1,
                y: 0.05,
                z: 0,
                pitch: 80,
                roll: 120,
                yaw: 160
            }
        },
        quantity: 0,
        icon: 'fishingrod'
    },
    tracksuit: {
        name: 'Track Suit',
        base: 'uniform',
        key: 'tracksuit',
        props: {
            restriction: -1,
            female: [
                { id: 3, value: 15 },
                { id: 4, value: 16 },
                { id: 6, value: 4 },
                { id: 8, value: 9 },
                { id: 11, value: 16 }
            ],
            male: [
                { id: 3, value: 15 },
                { id: 4, value: 18 },
                { id: 6, value: 31 },
                { id: 8, value: 15 },
                { id: 11, value: 5 }
            ]
        },
        quantity: 0,
        icon: 'outfit'
    },
    hikingoutfit: {
        name: 'Hiking Outfit',
        base: 'uniform',
        key: 'hikingoutfit',
        props: {
            restriction: -1,
            female: [
                { id: 3, value: 1 },
                { id: 4, value: 25 },
                { id: 5, value: 33 },
                { id: 6, value: 65 },
                { id: 8, value: 26 },
                { id: 11, value: 1 }
            ],
            male: [
                { id: 3, value: 1 },
                { id: 4, value: 15 },
                { id: 5, value: 33 },
                { id: 6, value: 62 },
                { id: 8, value: 15 },
                { id: 11, value: 41 }
            ]
        },
        quantity: 0,
        icon: 'outfit'
    },
    policeuniform: {
        name: 'Police Uniform',
        base: 'uniform',
        key: 'policeuniform',
        props: {
            restriction: -1,
            female: [
                { id: 3, value: 0 },
                { id: 4, value: 30 },
                { id: 6, value: 24 },
                { id: 8, value: 35 },
                { id: 11, value: 48 }
            ],
            male: [
                { id: 3, value: 0 },
                { id: 4, value: 31 },
                { id: 6, value: 24 },
                { id: 8, value: 58 },
                { id: 11, value: 55 }
            ]
        },
        quantity: 0,
        icon: 'outfit'
    },
    driverslicense: {
        name: 'Drivers License',
        base: 'license',
        key: 'driverslicense',
        props: {},
        quantity: 0,
        icon: 'id-card'
    },
    medkit: {
        name: 'Medical Kit',
        base: 'medkit',
        key: 'medkit',
        props: {},
        quantity: 0,
        icon: 'medical-pack'
    },
    repairkit: {
        name: 'Repair Kit',
        base: 'repairkit',
        key: 'repairkit',
        props: {},
        quantity: 0,
        icon: 'auto-repair'
    },
    gascan: {
        name: 'Gas Can',
        base: 'gascan',
        key: 'gascan',
        props: {},
        quantity: 0,
        icon: 'jerrycan'
    },
    rope: {
        name: 'Bundle of Rope (5 Min)',
        base: 'rope',
        key: 'rope',
        props: {},
        quantity: 0,
        icon: 'rope'
    },
    cuffs: {
        name: 'Cuffs (10 Min)',
        base: 'cuffs',
        key: 'cuffs',
        props: {},
        quantity: 0,
        icon: 'cuffs'
    },
    phone: {
        name: 'Phone',
        base: 'phone',
        key: 'phone',
        props: {},
        quantity: 0,
        icon: 'phone'
    },
    candy: {
        name: 'Candy Bar',
        base: 'food',
        key: 'candy',
        props: {
            health: 2
        },
        quantity: 0,
        icon: 'chocolate-bar'
    },
    hotdog: {
        name: 'Hot Dog',
        base: 'food',
        key: 'hotdog',
        props: {
            health: 2
        },
        quantity: 0,
        icon: 'sausage'
    },
    burger: {
        name: 'Burger',
        base: 'food',
        key: 'burger',
        props: {
            health: 2
        },
        quantity: 0,
        icon: 'burger'
    },
    jug: {
        name: 'Empty Jug',
        base: 'generic',
        key: 'jug',
        props: {},
        quantity: 0,
        icon: 'jug'
    },
    waterjug: {
        name: 'Water Jug',
        base: 'waterjug',
        key: 'jug',
        props: {},
        quantity: 0,
        icon: 'waterjug'
    },
    ingredient: {
        name: '',
        base: 'ingredient',
        key: 'ingredient',
        props: {},
        quantity: 0,
        icon: ''
    },
    dice: {
        name: 'Dice',
        base: 'dice',
        key: 'dice',
        props: {},
        quantity: 0,
        icon: 'dice'
    }
};

alt.on('orp:AddItems', jsonString => {
    const newData = JSON.parse(jsonString);
    Object.keys(newData).forEach(key => {
        if (Items[key]) {
            alt.log(`\r\n Item ${key} is already defined. Overwrote it. \r\n`);
            return;
        }
        Items[key] = newData[key];
        alt.log(`Item Addon Added: ${key}`);
    });
});

alt.on('orp:AddBaseItems', jsonString => {
    const newData = JSON.parse(jsonString);
    Object.keys(newData).forEach(key => {
        if (BaseItems[key]) {
            alt.log(`\r\n Item ${key} is already defined. Overwrote it. \r\n`);
            return;
        }
        BaseItems[key] = newData[key];
        alt.log(`Base Item Addon Added: ${key}`);
    });
});
