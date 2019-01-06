import MigrationService from "../services/migration-service";

async function run () {
  const migrationService = new MigrationService()
  await migrationService.rollbackLastMigrationGroupForAllSchemas()
}

run().then(() => {
  console.log('done')
  process.exit(0)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})
