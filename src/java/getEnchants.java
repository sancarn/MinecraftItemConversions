for (Item item : Item.REGISTRY) {
    for (Enchantment ench : Enchantment.REGISTRY) {
        if ((!ench.isTreasureEnchantment() || false) && (ench.type.canEnchantItem(item) || item == Items.BOOK)) {
            for (int i=0; i< ench.getMaxLevel(); i++) {
                  System.out.println(Item.REGISTRY.getNameForObject(item) + "," + Enchantment.REGISTRY.getNameForObject(ench).getResourcePath() + "_" + (i+1));
            }
        }
    }
}
