//
//  ctdBaseViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdAlertViewController.h"

@interface ctdBaseViewController : UIViewController<AlertViewDelegate>{
    UIButton *signoutButton;
    ctdAlertViewController *alertView;
}

@property (nonatomic) BOOL hasSignoutButton;

- (void)showAlert:(typeAlert)type;
- (void)showActivityIndicator;
- (void)hideActivityIndicator;

@end
