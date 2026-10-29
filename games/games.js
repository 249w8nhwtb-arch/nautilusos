// name | publisher | year | genres (comma) | flags: f = free-to-play, m = Microsoft first-party (Game Pass)
const RAW = `
Fortnite|Epic Games|2017|Battle Royale,Shooter|f
Call of Duty: Black Ops 6|Activision|2024|Shooter|m
Call of Duty: Black Ops 7|Activision|2025|Shooter|m
Call of Duty: Modern Warfare III|Activision|2023|Shooter|m
Call of Duty: Modern Warfare II|Activision|2022|Shooter|m
Call of Duty: Warzone|Activision|2020|Battle Royale,Shooter|fm
Call of Duty: Black Ops Cold War|Activision|2020|Shooter|m
Call of Duty: Vanguard|Activision|2021|Shooter|m
VALORANT|Riot Games|2024|Shooter,Tactical|f
Tom Clancy's Rainbow Six Siege X|Ubisoft|2015|Shooter,Tactical|f
Apex Legends|Electronic Arts|2019|Battle Royale,Shooter|f
Overwatch 2|Blizzard Entertainment|2022|Shooter,Hero|fm
Halo Infinite|Xbox Game Studios|2021|Shooter|fm
Halo: The Master Chief Collection|Xbox Game Studios|2014|Shooter|m
Halo 5: Guardians|Xbox Game Studios|2015|Shooter|m
Gears 5|Xbox Game Studios|2019|Shooter,Action|m
Gears of War: Reloaded|Xbox Game Studios|2025|Shooter,Action|m
Destiny 2|Bungie|2017|Shooter,RPG|f
Marvel Rivals|NetEase Games|2024|Shooter,Hero|f
The Finals|Embark Studios|2023|Shooter|f
Battlefield 6|Electronic Arts|2025|Shooter|
Battlefield 2042|Electronic Arts|2021|Shooter|
Helldivers 2|Sony Interactive Entertainment|2025|Shooter,Co-op|
Tom Clancy's The Division 2|Ubisoft|2019|Shooter,RPG|
Tom Clancy's Ghost Recon Breakpoint|Ubisoft|2019|Shooter,Tactical|
PUBG: Battlegrounds|Krafton|2017|Battle Royale,Shooter|f
Warframe|Digital Extremes|2014|Shooter,Action|f
Borderlands 4|2K|2025|Shooter,RPG|
Borderlands 3|2K|2019|Shooter,RPG|
DOOM: The Dark Ages|Bethesda|2025|Shooter|m
DOOM Eternal|Bethesda|2020|Shooter|m
Wolfenstein II: The New Colossus|Bethesda|2017|Shooter|m
Starfield|Bethesda|2023|RPG,Adventure|m
The Elder Scrolls V: Skyrim Special Edition|Bethesda|2016|RPG,Adventure|m
The Elder Scrolls IV: Oblivion Remastered|Bethesda|2025|RPG,Adventure|m
The Elder Scrolls Online|Bethesda|2015|RPG,MMO|m
Fallout 4|Bethesda|2015|RPG,Shooter|m
Fallout 76|Bethesda|2018|RPG,Survival|m
Indiana Jones and the Great Circle|Bethesda|2024|Action,Adventure|m
The Outer Worlds 2|Xbox Game Studios|2025|RPG,Shooter|m
Avowed|Xbox Game Studios|2025|RPG,Action|m
Forza Horizon 5|Xbox Game Studios|2021|Racing|m
Forza Horizon 4|Xbox Game Studios|2018|Racing|m
Forza Motorsport|Xbox Game Studios|2023|Racing|m
Microsoft Flight Simulator 2024|Xbox Game Studios|2024|Simulation|m
Minecraft|Mojang Studios|2011|Sandbox,Survival|m
Minecraft Dungeons|Mojang Studios|2020|Action,Co-op|m
Minecraft Legends|Mojang Studios|2023|Strategy,Action|m
Sea of Thieves|Xbox Game Studios|2018|Adventure,Co-op|m
Grounded|Xbox Game Studios|2022|Survival,Co-op|m
Grounded 2|Xbox Game Studios|2025|Survival,Co-op|m
State of Decay 2|Xbox Game Studios|2018|Survival,Action|m
Hi-Fi Rush|Bethesda|2023|Action,Rhythm|m
Ninja Gaiden 2 Black|Koei Tecmo|2025|Action|
Ninja Gaiden 4|Xbox Game Studios|2025|Action|m
Microsoft Flight Simulator|Xbox Game Studios|2020|Simulation|m
Age of Empires II: Definitive Edition|Xbox Game Studios|2023|Strategy|m
Age of Empires IV|Xbox Game Studios|2024|Strategy|m
Age of Mythology: Retold|Xbox Game Studios|2024|Strategy|m
Diablo IV|Blizzard Entertainment|2023|RPG,Action|m
Diablo III: Reaper of Souls|Blizzard Entertainment|2014|RPG,Action|m
Crash Bandicoot N. Sane Trilogy|Activision|2018|Platformer|m
Tony Hawk's Pro Skater 3 + 4|Activision|2025|Sports|m
Ori and the Will of the Wisps|Xbox Game Studios|2020|Platformer,Adventure|m
Ori and the Blind Forest|Xbox Game Studios|2015|Platformer,Adventure|m
Psychonauts 2|Xbox Game Studios|2021|Platformer,Adventure|m
Microsoft Solitaire Collection|Xbox Game Studios|2012|Card,Casual|fm
South of Midnight|Xbox Game Studios|2025|Action,Adventure|m
Grand Theft Auto V|Rockstar Games|2014|Action,Open World|
Red Dead Redemption 2|Rockstar Games|2018|Action,Open World|
Red Dead Redemption|Rockstar Games|2010|Action,Open World|
Cyberpunk 2077|CD PROJEKT RED|2020|RPG,Open World|
The Witcher 3: Wild Hunt|CD PROJEKT RED|2015|RPG,Open World|
Elden Ring|Bandai Namco|2022|RPG,Action|
Elden Ring Nightreign|Bandai Namco|2025|RPG,Co-op|
Dark Souls III|Bandai Namco|2016|RPG,Action|
Sekiro: Shadows Die Twice|Activision|2019|Action|
Baldur's Gate 3|Larian Studios|2023|RPG,Strategy|
Hogwarts Legacy|Warner Bros. Games|2023|RPG,Open World|
Assassin's Creed Shadows|Ubisoft|2025|Action,Open World|
Assassin's Creed Valhalla|Ubisoft|2020|Action,Open World|
Far Cry 6|Ubisoft|2021|Shooter,Open World|
Monster Hunter Wilds|Capcom|2025|Action,RPG|
Resident Evil 4|Capcom|2023|Horror,Action|
Resident Evil Village|Capcom|2021|Horror,Action|
Resident Evil Requiem|Capcom|2026|Horror,Action|
Street Fighter 6|Capcom|2023|Fighting|
Mortal Kombat 1|Warner Bros. Games|2023|Fighting|
Tekken 8|Bandai Namco|2024|Fighting|
Brawlhalla|Ubisoft|2018|Fighting|f
Dragon Ball: Sparking! Zero|Bandai Namco|2024|Fighting|
EA SPORTS FC 26|Electronic Arts|2025|Sports|
EA SPORTS FC 25|Electronic Arts|2024|Sports|
Madden NFL 26|Electronic Arts|2025|Sports|
NBA 2K26|2K|2025|Sports|
NBA 2K25|2K|2024|Sports|
EA SPORTS College Football 26|Electronic Arts|2025|Sports|
NHL 26|Electronic Arts|2025|Sports|
MLB The Show 25|Sony Interactive Entertainment|2025|Sports|
WWE 2K25|2K|2025|Sports,Fighting|
UFC 5|Electronic Arts|2023|Sports,Fighting|
Rocket League|Psyonix|2015|Sports,Racing|f
Fall Guys|Epic Games|2022|Party,Battle Royale|f
Roblox|Roblox Corporation|2015|Sandbox,Social|f
Among Us|Innersloth|2021|Party,Social|
Dead by Daylight|Behaviour Interactive|2017|Horror,Multiplayer|
Phasmophobia|Kinetic Games|2024|Horror,Co-op|
Alan Wake 2|Epic Games|2023|Horror,Adventure|
Five Nights at Freddy's: Security Breach|Steel Wool Studios|2022|Horror|
The Texas Chain Saw Massacre|Gun Interactive|2023|Horror,Multiplayer|
Hollow Knight|Team Cherry|2017|Platformer,Metroidvania|
Hollow Knight: Silksong|Team Cherry|2025|Platformer,Metroidvania|
Cuphead|StudioMDHR|2017|Platformer,Action|
Celeste|Maddy Makes Games|2018|Platformer|
Hades|Supergiant Games|2021|Action,Roguelike|
Dead Cells|Motion Twin|2018|Action,Roguelike|
Vampire Survivors|poncle|2022|Action,Roguelike|
Balatro|Playstack|2024|Card,Roguelike|
Stardew Valley|ConcernedApe|2016|Simulation,Casual|
Terraria|Re-Logic|2014|Sandbox,Adventure|
No Man's Sky|Hello Games|2016|Survival,Adventure|
Palworld|Pocketpair|2024|Survival,Adventure|
Subnautica|Unknown Worlds|2018|Survival,Adventure|
ARK: Survival Ascended|Studio Wildcard|2023|Survival,Multiplayer|
Rust Console Edition|Facepunch Studios|2021|Survival,Multiplayer|
7 Days to Die|The Fun Pimps|2024|Survival,Horror|
DayZ|Bohemia Interactive|2019|Survival,Shooter|
Valheim|Iron Gate|2023|Survival,Co-op|
The Forest|Endnight Games|2018|Survival,Horror|
It Takes Two|Electronic Arts|2021|Adventure,Co-op|
Split Fiction|Electronic Arts|2025|Adventure,Co-op|
Overcooked! All You Can Eat|Team17|2020|Party,Co-op|
Unravel Two|Electronic Arts|2018|Platformer,Co-op|
Sonic Frontiers|SEGA|2022|Platformer,Adventure|
Sonic X Shadow Generations|SEGA|2024|Platformer|
Like a Dragon: Infinite Wealth|SEGA|2024|RPG,Action|
Persona 5 Royal|SEGA|2022|RPG|
Final Fantasy XIV Online|Square Enix|2024|RPG,MMO|
Kingdom Hearts III|Square Enix|2019|RPG,Action|
Black Desert|Pearl Abyss|2019|RPG,MMO|f
Warhammer 40,000: Space Marine 2|Focus Entertainment|2024|Action,Shooter|
Star Wars Jedi: Survivor|Electronic Arts|2023|Action,Adventure|
Star Wars Outlaws|Ubisoft|2024|Action,Open World|
Star Wars Battlefront II|Electronic Arts|2017|Shooter|
Marvel's Guardians of the Galaxy|Square Enix|2021|Action,Adventure|
Batman: Arkham Knight|Warner Bros. Games|2015|Action,Adventure|
Mortal Shell|Playstack|2020|Action,RPG|
Lies of P|Neowiz|2023|Action,RPG|
Black Myth: Wukong|Game Science|2025|Action,RPG|
Need for Speed Unbound|Electronic Arts|2022|Racing|
The Crew Motorfest|Ubisoft|2023|Racing|
F1 25|Electronic Arts|2025|Racing,Sports|
Disney Speedstorm|Gameloft|2023|Racing|f
Asphalt Legends|Gameloft|2024|Racing|f
Farming Simulator 25|GIANTS Software|2024|Simulation|
PowerWash Simulator|FuturLab|2022|Simulation,Casual|
The Sims 4|Electronic Arts|2017|Simulation,Social|f
Planet Coaster 2|Frontier Developments|2024|Simulation|
Civilization VII|2K|2025|Strategy|
XCOM 2|2K|2016|Strategy,Tactical|
Halo Wars 2|Xbox Game Studios|2017|Strategy|m
World of Tanks Modern Armor|Wargaming|2014|Shooter,Multiplayer|f
World of Warships: Legends|Wargaming|2019|Shooter,Multiplayer|f
War Thunder|Gaijin Entertainment|2017|Shooter,Simulation|f
Smite 2|Hi-Rez Studios|2025|MOBA|f
Paladins|Hi-Rez Studios|2018|Shooter,Hero|f
Splitgate 2|1047 Games|2025|Shooter|f
Delta Force|TiMi Studio Group|2025|Shooter,Tactical|f
Off the Grid|Gunzilla Games|2025|Battle Royale,Shooter|f
Naraka: Bladepoint|NetEase Games|2023|Battle Royale,Action|f
Path of Exile 2|Grinding Gear Games|2024|RPG,Action|
Path of Exile|Grinding Gear Games|2017|RPG,Action|f
Skull and Bones|Ubisoft|2024|Action,Adventure|
Ghostwire: Tokyo|Bethesda|2023|Action,Horror|m
Prey|Bethesda|2017|Shooter,Horror|m
Dishonored 2|Bethesda|2016|Action,Stealth|m
Hitman World of Assassination|IO Interactive|2021|Action,Stealth|
Metal Gear Solid Delta: Snake Eater|Konami|2025|Action,Stealth|
Clair Obscur: Expedition 33|Kepler Interactive|2025|RPG|
Kingdom Come: Deliverance II|Deep Silver|2025|RPG,Open World|
Dying Light: The Beast|Techland|2025|Survival,Horror|
Dying Light 2 Stay Human|Techland|2022|Survival,Action|
Dead Island 2|Deep Silver|2023|Action,Horror|
Deep Rock Galactic|Coffee Stain Studios|2020|Shooter,Co-op|
Back 4 Blood|Warner Bros. Games|2021|Shooter,Co-op|
Left 4 Dead 2|Valve|2010|Shooter,Co-op|
Payday 3|Deep Silver|2023|Shooter,Co-op|
Remnant II|Gearbox Publishing|2023|Shooter,Co-op|
Titanfall 2|Electronic Arts|2016|Shooter|
Hunt: Showdown 1896|Crytek|2024|Shooter,Horror|
Chivalry 2|Tripwire Presents|2021|Action,Multiplayer|
For Honor|Ubisoft|2017|Fighting,Multiplayer|
LEGO Star Wars: The Skywalker Saga|Warner Bros. Games|2022|Action,Co-op|
Just Dance 2026 Edition|Ubisoft|2025|Party,Rhythm|
Jackbox Party Pack 10|Jackbox Games|2023|Party,Social|
Human: Fall Flat|Curve Games|2017|Party,Puzzle|
Portal 2|Valve|2011|Puzzle|
Tetris Effect: Connected|Enhance|2020|Puzzle|
Untitled Goose Game|Panic|2020|Puzzle,Casual|
Inside|Playdead|2016|Puzzle,Platformer|
Limbo|Playdead|2010|Puzzle,Platformer|
Outer Wilds|Annapurna Interactive|2020|Adventure,Puzzle|
Tunic|Finji|2022|Adventure,Action|
Cult of the Lamb|Devolver Digital|2022|Roguelike,Simulation|
Brotato|Blobfish|2023|Action,Roguelike|
Slime Rancher 2|Monomi Park|2022|Simulation,Casual|
Animal Well|Bigmode|2024|Platformer,Metroidvania|
Ark: Survival Evolved|Studio Wildcard|2017|Survival,Multiplayer|
Rainbow Six Extraction|Ubisoft|2022|Shooter,Co-op|
Call of Duty: Black Ops III|Activision|2015|Shooter|m
Call of Duty: Modern Warfare (2019)|Activision|2019|Shooter|m
Call of Duty: WWII|Activision|2017|Shooter|m
Call of Duty: Infinite Warfare|Activision|2016|Shooter|m
`;

const GAMES = RAW.trim().split("\n").map((line, id) => {
  const [name, publisher, year, genres, flags = ""] = line.split("|");
  return {
    id,
    name,
    publisher,
    year: Number(year),
    genres: genres.split(","),
    free: flags.includes("f"),
    firstParty: flags.includes("m"),
  };
});
