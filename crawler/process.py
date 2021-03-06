import json
import sys

def run(media_url_prefix, media_url_postfix):
    FILE_DIR = './data'
    INPUT_FILENAMES = [
        '9gag.json',
        'barked.json',
        'meowed.json',
        'voyaged.json',
    ]
    OUTPUT_FILENAME = './data/processed/data.json'

    processed_data = []
    for filename in INPUT_FILENAMES:
        with open(f'{FILE_DIR}/{filename}') as json_file:
            posts_data = json.load(json_file)

            for post_data in posts_data:
                media_urls = []
                for url in post_data['urls']:
                    filename_from_url = url.split('?')[0].split('/')[-1]
                    file_path = f'{media_url_prefix}{filename_from_url}{media_url_postfix}'
                    media_urls.append(file_path)

                processed_data.append({
                    'like_count': post_data['edge_media_preview_like']['count'],
                    'comment_count': post_data['edge_media_to_comment']['count'],
                    'caption': post_data['edge_media_to_caption']['edges'][0]['node']['text'],
                    'id': post_data['id'],
                    'short_code': post_data['shortcode'],
                    'hash_tags': post_data['tags'],
                    'taken_at': post_data['taken_at_timestamp'],
                    'media_urls': media_urls,
                    'username': post_data['username'],
                })
    
    with open(OUTPUT_FILENAME, 'w') as out_json_file:
        json.dump(processed_data, out_json_file, indent=4)


if __name__ == '__main__':
    media_url_prefix = sys.argv[1]
    media_url_postfix = sys.argv[2]
    run(media_url_prefix=media_url_prefix, media_url_postfix=media_url_postfix)
