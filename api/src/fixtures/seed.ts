import { prisma } from "../lib/prisma"; 
import seedCommon from "./seeds/SCommon";
import seedPictureGarden from "./seeds/SPictureGarden";
import seedUsers from "./seeds/SUser";
import seedWateringAndPictures from "./seeds/SWateringAndPicturesPlant";
import seedDates from "./seeds/SDate";
import seedTags from "./seeds/STag";
import seedPlants from "./seeds/SPlants";
import seedPlantHasDate from "./seeds/SPlantHasDate";
import seedPlantHasTag from "./seeds/SPlantHasTag";
import seedPlantHasCategory from "./seeds/SPlantHasCategory";
import seedPlantHasToxicPet from "./seeds/SPlantHasToxicPet";
import seedGarden from "./seeds/SGarden";
import seedGardenHasPet from "./seeds/SGardenHasPet";
import seedGardenHasPlant from "./seeds/SGardenHasPlants";
import seedUserHasFavory from "./seeds/SUserHasFavory";

async function main() {
    await seedUsers(prisma);
    await seedPictureGarden(prisma);
    await seedCommon(prisma);
    await seedWateringAndPictures(prisma);
    await seedDates(prisma);
    await seedTags(prisma);
    await seedPlants(prisma);
    await seedPlantHasDate(prisma);
    await seedPlantHasTag(prisma);
    await seedPlantHasCategory(prisma);
    await seedPlantHasToxicPet(prisma);
    await seedGarden(prisma);
    await seedGardenHasPet(prisma);
    await seedGardenHasPlant(prisma);
    await seedUserHasFavory(prisma);

    console.log("✔ Seeding completed !");
}

export default main;

main()
    .catch((e) => {
        console.error("❌ Seed error", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
