import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('nius')
export class NiusController {
    @Get()
    getNius() {
        return "AllNius";
    }

    @Get(':id')
    getNiusById(@Param('id') idNius: string) {
        return idNius;
    }

    @Post()
    createNius() {}

    @Patch(':id')
    updateNiusById(@Param('id') idNius: string) {}

    @Delete(':id')
    deleteNiusById(@Param('id') idNius: string) {}
}
