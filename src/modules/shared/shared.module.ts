import { FileService } from "@/modules/shared/utils/file";
import { FileSystemService } from "@/modules/shared/utils/file-system";
import { PathService } from "@/modules/shared/utils/path";
import { UrlService } from "@/modules/shared/utils/url";
import { Module } from "@nestjs/common";

@Module({
  providers: [FileService, UrlService, FileSystemService, PathService],
  exports: [FileService, UrlService, FileSystemService, PathService],
})
export class SharedModule {}
