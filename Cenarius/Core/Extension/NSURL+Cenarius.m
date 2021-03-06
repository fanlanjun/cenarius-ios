//
//  NSURL+Cenarius.m
//  Cenarius
//
//  Created by M on 2016/10/13.
//  Copyright © 2016年 M. All rights reserved.
//

#import "NSURL+Cenarius.h"
#import "NSString+Cenarius.h"
#import "NSDictionary+Cenarius.h"
#import "NSString+Cenarius.h"

@implementation NSURL (Cenarius)

- (BOOL)isHttpOrHttps
{
    NSString *scheme = [self.scheme uppercaseString];
    if ([scheme isEqualToString:@"HTTP"] || [scheme isEqualToString:@"HTTPS"])
    {
        return YES;
    }
    return NO;
}

- (NSDictionary *)queryDictionary {
    NSString *query = [[self query] decodingStringUsingURLEscape];
    return [query queryDictionary];
}

- (NSDictionary *)jsonDictionary
{
    NSString *string = [[self.absoluteString decodingStringUsingURLEscape] substringFromIndex:[@"cenarius://cenarius-container/widget/web?data=" length]];
    NSData *data = [string dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *jsonDic = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
    return jsonDic;
}


@end
