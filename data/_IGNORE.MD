# Ignored Data

|           Conversion          |                                                  Reason Ignored                                                         |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------|
|Lava-->stone                   |no resource destoryed in process                                                                                         |
|Lava-->cobblestone             |no resource destoryed in process                                                                                         |
|egg-->egg                      |no conversion                                                                                                            |
|fishing                        |no conversion                                                                                                            |
|empty bucket --> lava bucket   |not producing anything new                                                                                               |
|empty bucket --> water bucket  |not producing anything new                                                                                               |
|saplings -> saplings           |no conversion                                                                                                            |
|chorus flower -> chorus flower |no conversion                                                                                                            |
|villager: wheat -> bread       |no double counting                                                                                                       |
|end crystal -> dragon breath   |1 end crystal leads to infinite dragon breath (at the cost of that 1 crystal), thus this is infinite and does not count. |
|transmutation                  |fixed                                                                                                                    |
|enchantments                   |combinations of enchantments ignored, due to no extra use you are just combining multiple effects.                       |
|bonemeal->wood/crops           |bonemeal isn't required                                                                                                  |



## Enchanting:

### Ignored:			
sword_fireAspect->sword_fireAspectAndSharpness		

### Accepted:			

sword -> sword_fireAspect		
sword -> sword_sharpness		

### Reasoning:			
Different enchants bring different things to a weapon, multiple enchantments just build a combination of different enchants and don't "add anything special to the item" + at the moment we don't have the time + want to finish sand video.				

### Anti-argument:			
You get a less accurate picture. For instance, armor_protection cannot go to armor_protectionAndBlastProtection. In our system we ignore combinations as a possibility completely.			

### Ideal:			

|Source|             Enchant            |status|
|------|--------------------------------|------|
|armor |protection                      | pass |
|armor |aqua affinity                   | pass |
|armor |blast protection                | pass |
|armor |protection + blast protection   | fail |
|armor |protection + aqua affinity      | pass |
|armor |blast protection + aqua affinity| pass |

### Our approximation:	

|Source|             Enchant            |status|
|------|--------------------------------|------|
|armor |protection                      | pass |
|armor |aqua affinity                   | pass |
|armor |blast protection                | pass |
|armor |protection + blast protection   | fail |
|armor |protection + aqua affinity      | fail |
|armor |blast protection + aqua affinity| fail |

